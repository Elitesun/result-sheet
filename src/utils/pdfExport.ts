import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PDF_PAGE_WIDTH_MM = 210;
const PDF_PAGE_HEIGHT_MM = 297;
const PDF_SAFE_MARGIN_MM = 3;
const EXPORT_CONTENT_SAFETY_RATIO = 0.992;

function fitOverlayToPage(page: HTMLElement): void {
  const overlay = page.querySelector<HTMLElement>(".page-overlay");
  if (!overlay) {
    return;
  }

  const maxWidth = overlay.clientWidth;
  const maxHeight = overlay.clientHeight;
  const contentWidth = overlay.scrollWidth;
  const contentHeight = overlay.scrollHeight;
  const scale =
    Math.min(1, maxWidth / contentWidth, maxHeight / contentHeight) *
    EXPORT_CONTENT_SAFETY_RATIO;

  if (scale >= 1) {
    return;
  }

  // Keep every section visible on one A4 page when content is slightly taller.
  overlay.style.transform = `scale(${scale})`;
  overlay.style.transformOrigin = "top left";
  overlay.style.width = `${100 / scale}%`;
  overlay.style.height = `${100 / scale}%`;
}

async function nextFrame(): Promise<void> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function createExportClones(elements: HTMLElement[]): {
  root: HTMLDivElement;
  pages: HTMLElement[];
} {
  const root = document.createElement("div");
  root.className = "pdf-capture-root";

  const pages = elements.map((element) => {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.classList.add("result-page-export");
    root.appendChild(clone);
    return clone;
  });

  document.body.appendChild(root);
  return { root, pages };
}

async function ensureImagesReady(elements: HTMLElement[]): Promise<void> {
  const imageElements = elements.flatMap((element) =>
    Array.from(element.querySelectorAll("img")),
  );

  await Promise.all(
    imageElements.map(async (image) => {
      if (image.complete && image.naturalWidth > 0) {
        if (typeof image.decode === "function") {
          await image.decode().catch(() => undefined);
        }
        return;
      }

      await new Promise<void>((resolve) => {
        const onReady = () => resolve();
        image.addEventListener("load", onReady, { once: true });
        image.addEventListener("error", onReady, { once: true });
      });
    }),
  );
}

export async function exportElementsToPdf(
  elements: HTMLElement[],
  fileName: string,
): Promise<void> {
  if (elements.length === 0) {
    throw new Error("No pages to export");
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  document.documentElement.classList.add("pdf-export-mode");
  let captureRoot: HTMLDivElement | null = null;

  try {
    const { root, pages } = createExportClones(elements);
    captureRoot = root;

    await ensureImagesReady(pages);
    await nextFrame();
    pages.forEach(fitOverlayToPage);
    await nextFrame();

    for (let index = 0; index < pages.length; index += 1) {
      const element = pages[index];
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imageData = canvas.toDataURL("image/png");
      if (index > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imageData,
        "PNG",
        PDF_SAFE_MARGIN_MM,
        PDF_SAFE_MARGIN_MM,
        PDF_PAGE_WIDTH_MM - PDF_SAFE_MARGIN_MM * 2,
        PDF_PAGE_HEIGHT_MM - PDF_SAFE_MARGIN_MM * 2,
        undefined,
        "SLOW",
      );
    }

    pdf.save(fileName);
  } finally {
    captureRoot?.remove();
    document.documentElement.classList.remove("pdf-export-mode");
  }
}
