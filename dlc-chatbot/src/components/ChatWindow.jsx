import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';


const ChatWindow = ({ selectedApp, onBack }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Hi! I can help you learn about ${selectedApp}. Ask me anything.` },
  ]);
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch(`https://digital-literacy-helper.onrender.com/faqs/${selectedApp.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs) setFaqs(data.faqs);
      })
      .catch((err) => {
        console.error("FAQ fetch failed", err);
      });
  }, [selectedApp]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { from: 'user', text };
    setMessages((prev) => [...prev, userMsg]);

    const loadingMsg = { from: 'bot', text: 'Typing...' };
    setMessages((prev) => [...prev, loadingMsg]);
    setLoading(true);

    try {
      const response = await fetch('https://digital-literacy-helper.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, app: selectedApp }),
      });

      const data = await response.json();

      setMessages((prev) => prev.filter((msg) => msg !== loadingMsg));

      if (data.steps && Array.isArray(data.steps)) {
        const stepMessages = data.steps.map((step) => {
          const utterance = new SpeechSynthesisUtterance(step);
          utterance.lang = 'en-IN';
          speechSynthesis.speak(utterance);
          return { from: 'bot', text: step };
        });
        setMessages((prev) => [...prev, ...stepMessages]);
      } else {
        setMessages((prev) => [...prev, { from: 'bot', text: 'Sorry, I couldn\'t find an answer.' }]);
      }
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg !== loadingMsg));
      setMessages((prev) => [...prev, { from: 'bot', text: 'Server error. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const showAllFAQs = () => {
    if (faqs.length === 0) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'No FAQs available.' }]);
    } else {
      const faqList = faqs.map((q) => `• ${q}`).join('\n');
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: `Here are some questions you can ask:\n${faqList}` },
      ]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col h-[75vh] overflow-hidden min-h-screen md:min-h-0">
      <div className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-1 rounded hover:bg-indigo-500 transition"
            aria-label="Back to app selection"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {selectedApp} ChatBot
        </div>

        <button
          onClick={showAllFAQs}
          className="text-sm bg-white text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100"
        >
          Show All FAQs
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <InputBar onSend={sendMessage} disabled={loading} />
    </div>
  );
};

export default ChatWindow;
