import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FileDropzone = ({ onDrop, accept = { 'application/pdf': ['.pdf'] }, multiple = false }) => {
  const onDropCallback = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept,
    multiple
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
        ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <FaUpload className="mx-auto text-4xl mb-4 text-gray-400" />
      <p className="text-lg text-gray-600">
        {isDragActive
          ? "Drop your PDF files here"
          : "Drag & drop PDF files here, or click to select"}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        {multiple ? "You can upload multiple files" : "Only single file upload supported"}
      </p>
    </motion.div>
  );
};

export default FileDropzone;