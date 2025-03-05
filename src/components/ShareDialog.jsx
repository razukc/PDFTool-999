import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShareButtons from './ShareButtons';
import { useAnalytics } from '../hooks/useAnalytics';

const ShareDialog = ({ isOpen, onClose, fileUrl, fileName }) => {
  const { trackShare } = useAnalytics();

  const handleShare = (platform) => {
    trackShare(platform);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold mb-4">Share PDF</h3>
            <p className="text-gray-600 mb-6">Share "{fileName}" on social media</p>
            
            <div className="flex justify-center mb-6">
              <ShareButtons 
                url={fileUrl} 
                title={`Check out this PDF: ${fileName}`}
                onShare={handleShare}
              />
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareDialog;