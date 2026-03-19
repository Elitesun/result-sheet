import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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

  try {
    await ensureImagesReady(elements);

    for (let index = 0; index < elements.length; index += 1) {
      const element = elements[index];
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.95);
      if (index > 0) {
        pdf.addPage();
      }

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const scale = Math.min(
        pageWidth / canvas.width,
        pageHeight / canvas.height,
      );
      const targetWidth = canvas.width * scale;
      const targetHeight = canvas.height * scale;
      const offsetX = (pageWidth - targetWidth) / 2;
      const offsetY = (pageHeight - targetHeight) / 2;

      pdf.addImage(
        imageData,
        "JPEG",
        offsetX,
        offsetY,
        targetWidth,
        targetHeight,
        undefined,
        "FAST",
      );
    }

    pdf.save(fileName);
  } finally {
    document.documentElement.classList.remove("pdf-export-mode");
  }
}
