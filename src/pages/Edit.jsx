import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import toast from 'react-hot-toast';
import FileDropzone from '../components/FileDropzone';
import { motion } from 'framer-motion';

const Edit = () => {
  const [file, setFile] = useState(null);
  const [pageToRemove, setPageToRemove] = useState('');
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

  const handleRemovePage = async () => {
    if (!file || !pageToRemove) {
      toast.error('Please select a file and specify a page number');
      return;
    }

    const pageNum = parseInt(pageToRemove);
    if (pageNum < 1 || pageNum > totalPages) {
      toast.error('Invalid page number');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      pdf.removePage(pageNum - 1);
      
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'edited.pdf';
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success('Page removed successfully!');
    } catch (error) {
      toast.error('Error removing page');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Edit PDF</h2>
      
      <FileDropzone onDrop={handleDrop} multiple={false} />
      
      {file && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Selected File: {file.name}</h3>
          <p className="text-gray-600 mb-4">Total Pages: {totalPages}</p>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Remove Page Number
            </label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={pageToRemove}
              onChange={(e) => setPageToRemove(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter page number to remove"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemovePage}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold
              hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Remove Page
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Edit;