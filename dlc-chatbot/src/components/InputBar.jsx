import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const InputBar = ({ onSend, disabled }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.trim()) {
        onSend(transcript);
        setText("");
      }
    };

    recognitionRef.current = recognition;
  }, [onSend]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex items-center border-t px-3 py-2 bg-white space-x-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        type="text"
        disabled={disabled}
        placeholder="Ask something..."
        className="flex-1 px-3 py-2 border rounded-full outline-none text-sm break-words"
      />

      <button
        onClick={toggleListening}
        className={`text-gray-600 hover:text-indigo-600 transition ${isListening ? "animate-pulse" : ""}`}
        aria-label="Voice input"
      >
        {isListening ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
      </button>

      <button
        onClick={handleSend}
        disabled={disabled}
        className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
};

export default InputBar;
