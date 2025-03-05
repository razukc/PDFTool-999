import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import toast from 'react-hot-toast';
import FileDropzone from '../components/FileDropzone';
import ShareDialog from '../components/ShareDialog';
import { motion } from 'framer-motion';
import { useAnalytics } from '../hooks/useAnalytics';
import { FaShare } from 'react-icons/fa';

const Merge = () => {
  const [files, setFiles] = useState([]);
  const [mergedFileUrl, setMergedFileUrl] = useState('');
  const [mergedFileName, setMergedFileName] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { trackPDFUpload, trackPDFMerge, trackError } = useAnalytics();

  const handleDrop = (newFiles) => {
    const totalSize = newFiles.reduce((sum, file) => sum + file.size, 0);
    trackPDFUpload(newFiles.length, totalSize);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      trackError('insufficient_files', 'merge');
      toast.error('Please select at least 2 PDF files to merge');
      return;
    }

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setMergedFileUrl(url);
      setMergedFileName('merged.pdf');
      trackPDFMerge(files.length, true);
      toast.success('PDFs merged successfully!');
    } catch (error) {
      trackError(error.message, 'merge');
      toast.error('Error merging PDFs');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Merge PDFs</h2>
      <FileDropzone onDrop={handleDrop} multiple={true} />
      
      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
                <span>{file.name}</span>
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMerge}
              className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Merge PDFs
            </motion.button>

            {mergedFileUrl && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsShareOpen(true)}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
              >
                <FaShare className="mr-2" />
                Share
              </motion.button>
            )}
          </div>
        </div>
      )}

      <ShareDialog
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        fileUrl={mergedFileUrl}
        fileName={mergedFileName}
      />
    </div>
  );
};

export default Merge;