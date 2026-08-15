import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

export interface PDFExportOptions {
  fileName?: string;
  elementId?: string;
  onProgress?: (stage: string) => void;
}

export const exportResumeToPDF = async ({
  fileName = 'Resume.pdf',
  elementId = 'resume-printable-area',
  onProgress
}: PDFExportOptions = {}): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Printable element #${elementId} not found`);
    }

    onProgress?.('Preparing document layout...');

    // Wait a brief tick to ensure any fonts/images are rendered
    await new Promise((resolve) => setTimeout(resolve, 200));

    onProgress?.('Generating high-resolution snapshot...');

    const canvas = await html2canvas(element, {
      scale: 2.5, // Crisp 300 DPI equivalent
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      imageTimeout: 15000
    });

    onProgress?.('Formatting A4 pages...');

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Handle multiple pages cleanly
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    onProgress?.('Finalizing PDF download...');
    const sanitizedFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(sanitizedFileName);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore confetti errors
    }

    return true;
  } catch (error) {
    console.error('Failed to export PDF via canvas:', error);
    // Fallback to browser print
    onProgress?.('Opening print dialog...');
    window.print();
    return true;
  }
};
