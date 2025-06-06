// AppSelector.jsx
import React, { useEffect, useState } from 'react';
import whatsapp from '../assets/whatsapp.png'; // Assuming you have a WhatsApp icon
import paytm from '../assets/paytm.png'; // Assuming you have a WhatsApp icon
import maps from '../assets/maps.png'; // Assuming you have a WhatsApp icon
const apps = [
  { name: 'WhatsApp', icon: whatsapp },
  { name: 'Paytm', icon: paytm },
  { name: 'Maps', icon: maps },
];

const AppSelector = ({ onSelect }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setLoaded(true);
  }, []);

return (
  <div className="text-center space-y-8 py-12">
    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
      Welcome to Digital Literacy Helper!
    </h1>
    <p className="text-white/80 max-w-xl mx-auto text-lg font-medium">
      Choose an app below to learn step-by-step tutorials and FAQs.
    </p>

    <div className="flex justify-center gap-10 mt-6 flex-wrap">
      {apps.map((app, idx) => (
        <div
          key={app.name}
          onClick={() => onSelect(app.name)}
          className={`
            cursor-pointer rounded-xl p-4 shadow-xl backdrop-blur-lg bg-white/20 border border-white/30
            transform transition-transform duration-500 ease-out
            hover:scale-110 hover:shadow-2xl
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{ transitionDelay: `${idx * 150}ms` }}
        >
          <img
            src={app.icon}
            alt={app.name}
            className="w-28 h-28 object-contain mx-auto mb-3 select-none bg-white rounded-lg"
            draggable={false}
          />
          <p className="text-gray-50 text-xl font-semibold">{app.name}</p>
        </div>
      ))}
    </div>
  </div>
);

};

export default AppSelector;
