import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const MM_PER_PX = 0.2645833333;

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

  for (let index = 0; index < elements.length; index += 1) {
    const element = elements[index];
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imageData = canvas.toDataURL("image/jpeg", 0.95);
    const imageWidth = canvas.width * MM_PER_PX;
    const imageHeight = canvas.height * MM_PER_PX;

    if (index > 0) {
      pdf.addPage();
    }

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const scale = Math.min(pageWidth / imageWidth, pageHeight / imageHeight);
    const targetWidth = imageWidth * scale;
    const targetHeight = imageHeight * scale;
    const x = (pageWidth - targetWidth) / 2;
    const y = (pageHeight - targetHeight) / 2;

    pdf.addImage(
      imageData,
      "JPEG",
      x,
      y,
      targetWidth,
      targetHeight,
      undefined,
      "FAST",
    );
  }

  pdf.save(fileName);
}
