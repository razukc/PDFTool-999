import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import toast from 'react-hot-toast';
import FileDropzone from '../components/FileDropzone';
import { motion } from 'framer-motion';

const Merge = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
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
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
      
      URL.revokeObjectURL(url);
      toast.success('PDFs merged successfully!');
    } catch (error) {
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
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMerge}
            className="mt-6 w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold
              hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Merge PDFs
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Merge;