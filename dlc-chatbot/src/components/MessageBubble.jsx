// MessageBubble.jsx
import React from 'react';

const MessageBubble = ({ message }) => {
  const isUser = message.from === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-[75%] break-words text-sm ${
          isUser
            ? 'bg-indigo-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
