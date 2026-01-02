import { ToolBarButton } from '../types/ToolBarButton.type';
import {
  downloadAsHTML,
  downloadAsWord,
  downloadAsPDF,
  PDFOptions,
} from '../../../shared/utils/downloadUtils';
import { exportContent } from 'roosterjs-content-model-core';

type DownloadButtonKeys = 'buttonNameDownload' | 'downloadHTML' | 'downloadWord' | 'downloadPDF';

/**
 * Generates a filename with timestamp
 */
const generateFileName = (extension: string): string => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `document-${timestamp}.${extension}`;
};

export const downloadButton: ToolBarButton<DownloadButtonKeys> = {
  key: 'buttonNameDownload',
  iconName: 'FaDownload',
  onClick: async (editor, key) => {
    try {
      const htmlContent = `
      <html>
        <head></head>
        <body>
          ${exportContent(editor, 'HTML')}
        </body>
      </html>`;

      if (!htmlContent) {
        alert('No content to download');
        return;
      }

      switch (key) {
        case 'downloadHTML':
          downloadAsHTML(htmlContent, generateFileName('html'));
          break;

        case 'downloadWord':
          await downloadAsWord(htmlContent, generateFileName('docx'));
          break;

        case 'downloadPDF': {
          const pdfOptions: PDFOptions = {
            header: {
              text: 'Header',
              showPageNumbers: true,
            },
            footer: {
              showPageNumbers: true,
              copyright: `© ${new Date().getFullYear()}`,
            },
            margin: {
              top: 20,
              right: 15,
              bottom: 20,
              left: 15,
            },
          };
          await downloadAsPDF(htmlContent, generateFileName('pdf'), pdfOptions);
          break;
        }

        default:
          console.warn(`Unknown download type: ${key}`);
      }
    } catch (error) {
      console.error('Error downloading content:', error);
      alert(`Failed to download: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  dropDownMenu: {
    items: [
      {
        key: 'downloadHTML',
        label: 'HTML',
        icon: 'FaHtml5',
        type: 'item',
      },
      {
        key: 'downloadWord',
        label: 'Word',
        icon: 'FaFileWord',
        type: 'item',
      },
      {
        key: 'downloadPDF',
        label: 'PDF',
        icon: 'FaFilePdf',
        type: 'item',
      },
    ],
  },
};
