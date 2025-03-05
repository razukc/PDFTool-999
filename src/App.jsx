import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QuestProvider } from '@questlabs/react-sdk';
import Navbar from './components/Navbar';
import FeedbackButton from './components/FeedbackButton';
import Home from './pages/Home';
import Merge from './pages/Merge';
import Split from './pages/Split';
import Edit from './pages/Edit';
import questConfig from './config/questConfig';
import '@questlabs/react-sdk/dist/style.css';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/merge" element={<Merge />} />
              <Route path="/split" element={<Split />} />
              <Route path="/edit" element={<Edit />} />
            </Routes>
          </main>
          <FeedbackButton />
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </QuestProvider>
  );
}

export default App;