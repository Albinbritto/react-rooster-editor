import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

export interface PDFOptions {
  header?: {
    text?: string;
    showPageNumbers?: boolean;
  };
  footer?: {
    text?: string;
    showPageNumbers?: boolean;
    copyright?: string;
  };
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

/**
 * Downloads HTML content as an HTML file
 */
export const downloadAsHTML = (htmlContent: string, fileName: string = 'document.html') => {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  saveAs(blob, fileName);
};

/**
 * Converts HTML content to plain text and creates a Word document
 */
export const downloadAsWord = async (htmlContent: string, fileName: string = 'document.docx') => {
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const paragraphs: any[] = [];

    const processNode = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        const text = element.textContent || '';

        if (!text.trim()) return;

        if (tagName === 'h1') {
          paragraphs.push(
            new Paragraph({
              text: text,
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 240, after: 120 },
            })
          );
        } else if (tagName === 'h2') {
          paragraphs.push(
            new Paragraph({
              text: text,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 100 },
            })
          );
        } else if (tagName === 'h3') {
          paragraphs.push(
            new Paragraph({
              text: text,
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 160, after: 80 },
            })
          );
        } else if (tagName === 'p' || tagName === 'div') {
          if (text.trim()) {
            paragraphs.push(
              new Paragraph({
                text: text,
                spacing: { after: 120 },
              })
            );
          }
        } else if (tagName === 'li') {
          paragraphs.push(
            new Paragraph({
              text: '• ' + text,
              spacing: { after: 80 },
            })
          );
        } else if (tagName === 'strong' || tagName === 'b') {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun({ text: text, bold: true })],
              spacing: { after: 120 },
            })
          );
        } else if (tagName === 'em' || tagName === 'i') {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun({ text: text, italics: true })],
              spacing: { after: 120 },
            })
          );
        } else {
          if (text.trim()) {
            paragraphs.push(
              new Paragraph({
                text: text,
                spacing: { after: 120 },
              })
            );
          }
        }
      }
    };

    Array.from(tempDiv.children).forEach(processNode);

    if (paragraphs.length === 0) {
      const plainText = tempDiv.textContent || '';
      if (plainText.trim()) {
        paragraphs.push(new Paragraph({ text: plainText }));
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children:
            paragraphs.length > 0 ? paragraphs : [new Paragraph({ text: 'No content available' })],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw error;
  }
};

/**
 * Downloads content as PDF using jsPDF and html2canvas
 * Fully frontend implementation with multi-page support and header/footer
 */
export const downloadAsPDF = async (
  htmlContent: string,
  fileName: string = 'document.pdf',
  options: PDFOptions = {}
) => {
  try {
    // Calculate margins
    const margin = {
      top: options.margin?.top || 15,
      right: options.margin?.right || 15,
      bottom: options.margin?.bottom || 15,
      left: options.margin?.left || 15,
    };

    // Create a temporary container for rendering
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '794px'; // A4 width in pixels at 96 DPI
    container.style.paddingLeft = `${margin.left}px`;
    container.style.paddingRight = `${margin.right}px`;
    container.style.paddingTop = `${margin.top}px`;
    container.style.paddingBottom = `${margin.bottom}px`;
    container.classList.add('vive-contenteditable');
    container.style.backgroundColor = '#fff';
    container.style.fontSize = '16px';
    container.style.lineHeight = '1.5';
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    // Wait for images to load
    const images = container.getElementsByTagName('img');
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Capture the content as canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      //backgroundColor: '#ffffff',
    });

    // Remove temporary container
    document.body.removeChild(container);

    // Initialize PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const contentWidth = pageWidth - margin.left - margin.right;
    const contentHeight = pageHeight - margin.top - margin.bottom;

    // Calculate image dimensions
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Calculate number of pages needed
    const totalPages = Math.ceil(imgHeight / contentHeight);

    // Add header function
    const addHeader = (pageNum: number) => {
      if (options.header) {
        pdf.setFontSize(10);
        pdf.setTextColor(100);

        if (options.header.text) {
          pdf.text(options.header.text, margin.left, margin.top - 5);
        }

        if (options.header.showPageNumbers) {
          pdf.text(`Page ${pageNum}`, pageWidth - margin.right - 20, margin.top - 5);
        }

        // Header line
        pdf.setDrawColor(200);
        pdf.line(margin.left, margin.top - 2, pageWidth - margin.right, margin.top - 2);
      }
    };

    // Add footer function
    const addFooter = (pageNum: number) => {
      if (options.footer) {
        pdf.setFontSize(8);
        pdf.setTextColor(150);

        const footerY = pageHeight - margin.bottom + 10;

        if (options.footer.copyright) {
          pdf.text(options.footer.copyright, margin.left, footerY);
        }

        if (options.footer.showPageNumbers) {
          const pageText = options.footer.text
            ? `${options.footer.text} - Page ${pageNum} of ${totalPages}`
            : `Page ${pageNum} of ${totalPages}`;
          pdf.text(pageText, pageWidth / 2, footerY, { align: 'center' });
        }

        // Footer line
        pdf.setDrawColor(200);
        pdf.line(
          margin.left,
          pageHeight - margin.bottom + 5,
          pageWidth - margin.right,
          pageHeight - margin.bottom + 5
        );
      }
    };

    // Add pages
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      if (pageNum > 1) {
        pdf.addPage();
      }

      // Add header and footer
      addHeader(pageNum);
      addFooter(pageNum);

      // Calculate the portion of the image for this page
      const sourceY = (pageNum - 1) * (canvas.height / totalPages);
      const sourceHeight = canvas.height / totalPages;

      // Create a temporary canvas for this page's content
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sourceHeight;
      const pageContext = pageCanvas.getContext('2d');

      if (pageContext) {
        pageContext.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          canvas.width,
          sourceHeight
        );

        const pageImgData = pageCanvas.toDataURL('image/png');
        const pageImgHeight = (sourceHeight * imgWidth) / canvas.width;

        pdf.addImage(pageImgData, 'PNG', margin.left, margin.top, imgWidth, pageImgHeight);
      }
    }

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
