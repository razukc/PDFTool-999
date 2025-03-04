import React from 'react';
import { Link } from 'react-router-dom';
import { FaLayerGroup, FaScissors, FaPencil } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FaLayerGroup,
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into a single document',
    path: '/merge',
    color: 'blue'
  },
  {
    icon: FaScissors,
    title: 'Split PDF',
    description: 'Extract pages or split PDF into multiple files',
    path: '/split',
    color: 'green'
  },
  {
    icon: FaPencil,
    title: 'Edit PDF',
    description: 'Modify PDF content, add text, and more',
    path: '/edit',
    color: 'purple'
  }
];

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          PDF Management Made Simple
        </h1>
        <p className="text-xl text-gray-600">
          Edit, merge, and split PDF files with ease
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <motion.div
            key={feature.path}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <Link to={feature.path} className="block p-6">
              <feature.icon className={`text-4xl mb-4 text-${feature.color}-500`} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;