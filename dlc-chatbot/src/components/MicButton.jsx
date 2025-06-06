// src/components/MicButton.jsx
import React, { useState } from "react";
import { BsMicFill } from "react-icons/bs";

export default function MicButton({ onClick }) {
  const [listening, setListening] = useState(false);

  const handleMicClick = () => {
    setListening(true);
    onClick(); // trigger voice capture
    setTimeout(() => setListening(false), 3000); // reset pulse
  };

  return (
    <button
      onClick={handleMicClick}
      className={`ml-2 p-2 rounded-full transition-all ${
        listening ? "animate-ping bg-red-500/20" : "hover:bg-white/20"
      }`}
    >
      <BsMicFill className="text-red-500" size={18} />
    </button>
  );
}
