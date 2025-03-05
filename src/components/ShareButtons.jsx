import React from 'react';
import { 
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  LinkedinShareButton, LinkedinIcon,
  WhatsappShareButton, WhatsappIcon
} from 'react-share';
import { motion } from 'framer-motion';

const ShareButtons = ({ url, title }) => {
  const shareButtons = [
    {
      Button: FacebookShareButton,
      Icon: FacebookIcon,
      label: 'Facebook'
    },
    {
      Button: TwitterShareButton,
      Icon: TwitterIcon,
      label: 'Twitter'
    },
    {
      Button: LinkedinShareButton,
      Icon: LinkedinIcon,
      label: 'LinkedIn'
    },
    {
      Button: WhatsappShareButton,
      Icon: WhatsappIcon,
      label: 'WhatsApp'
    }
  ];

  return (
    <div className="flex space-x-4 items-center">
      {shareButtons.map(({ Button, Icon, label }) => (
        <motion.div
          key={label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button url={url} title={title}>
            <Icon size={32} round />
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default ShareButtons;