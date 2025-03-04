import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import toast from 'react-hot-toast';
import FileDropzone from '../components/FileDropzone';
import { motion } from 'framer-motion';

const Split = () => {
  const [file, setFile] = useState(null);
  const [pageRange, setPageRange] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const handleDrop = async ([newFile]) => {
    if (newFile) {
      try {
        const arrayBuffer = await newFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdf.getPageCount());
        setFile(newFile);
      } catch (error) {
        toast.error('Error loading PDF');
        console.error(error);
      }
    }
  };

  const handleSplit = async () => {
    if (!file) {
      toast.error('Please select a PDF file');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      const ranges = pageRange.split(',').map(range => {
        const [start, end] = range.trim().split('-').map(num => parseInt(num) - 1);
        return end ? { start, end } : { start, end: start };
      });

      for (let i = 0; i < ranges.length; i++) {
        const { start, end } = ranges[i];
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdf, Array.from(
          { length: end - start + 1 },
          (_, i) => start + i
        ));
        pages.forEach(page => newPdf.addPage(page));
        
        const newPdfBytes = await newPdf.save();
        const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `split_${i + 1}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      }
      
      toast.success('PDF split successfully!');
    } catch (error) {
      toast.error('Error splitting PDF');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Split PDF</h2>
      
      <FileDropzone onDrop={handleDrop} multiple={false} />
      
      {file && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Selected File: {file.name}</h3>
          <p className="text-gray-600 mb-4">Total Pages: {totalPages}</p>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Page Range (e.g., 1-3, 4, 5-7)
            </label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter page ranges"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSplit}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold
              hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Split PDF
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Split;