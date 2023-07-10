import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IPdfProps {
  preview: Blob | null;
  pageNumber: number;
  onDocumentLoadSuccess: any;
}

const Pdf = (props: IPdfProps) => {
  const { preview, pageNumber, onDocumentLoadSuccess } = props;
  return (
    <Document file={preview} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} />
    </Document>
  );
};

export default Pdf;
