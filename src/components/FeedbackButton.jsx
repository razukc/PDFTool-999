import React, { useState } from 'react';
import { FeedbackWorkflow } from '@questlabs/react-sdk';
import questConfig from '../config/questConfig';

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-l-lg shadow-lg hover:bg-red-700 transition-colors"
      >
        Feedback
      </button>

      <FeedbackWorkflow
        uniqueUserId={questConfig.USER_ID}
        questId={questConfig.QUEST_FEEDBACK_QUESTID}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        accent={questConfig.PRIMARY_COLOR}
      >
        <FeedbackWorkflow.ThankYou />
      </FeedbackWorkflow>
    </>
  );
};

export default FeedbackButton;