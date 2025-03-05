import { useQuestContext } from '@questlabs/react-sdk';

export const useAnalytics = () => {
  const { track } = useQuestContext();

  const trackEvent = (eventName, properties = {}) => {
    track(eventName, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  };

  return {
    trackPDFUpload: (fileCount, totalSize) => 
      trackEvent('pdf_upload', { fileCount, totalSize }),
    
    trackPDFMerge: (fileCount, success) =>
      trackEvent('pdf_merge', { fileCount, success }),
    
    trackPDFSplit: (pageRanges, success) =>
      trackEvent('pdf_split', { pageRanges, success }),
    
    trackPDFEdit: (operation, success) =>
      trackEvent('pdf_edit', { operation, success }),
    
    trackPageView: (page) =>
      trackEvent('page_view', { page }),
    
    trackError: (error, operation) =>
      trackEvent('error', { error, operation })
  };
};