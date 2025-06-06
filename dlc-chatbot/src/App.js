// App.jsx
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import AppSelector from './components/AppSelector';
import BubbleBackground from './components/BubbleBackground';

const App = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  const handleBack = () => setSelectedApp(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center">
      <BubbleBackground />
      <div className="w-full max-w-3xl mx-auto p-4 z-10">  
        {!selectedApp ? (
          <AppSelector onSelect={setSelectedApp} />
        ) : (
          <ChatWindow selectedApp={selectedApp} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default App;
