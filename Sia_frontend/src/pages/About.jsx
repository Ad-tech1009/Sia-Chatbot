import React from 'react';
import { FaBrain, FaLaughSquint, FaBookOpen, FaBalanceScale } from 'react-icons/fa';
import Threads from '../components/Threads';

const features = [
  { icon: <FaBrain size={28} />, title: 'Mood Waves' },
  { icon: <FaLaughSquint size={28} />, title: 'Banter Battle' },
  { icon: <FaBookOpen size={28} />, title: 'Scripture Arcade' },
  { icon: <FaBalanceScale size={28} />, title: 'Respect Mode' },
];

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Threads className="absolute inset-0 z-0" />

      <div className="relative z-10 px-6 py-20 flex flex-col items-center backdrop-blur-md bg-black/70">
        <h1 className="text-4xl font-bold mb-10 text-center">Meet Sia</h1>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-40 h-40 p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg hover:scale-105 transition-transform"
            >
              <div className="mb-3 text-indigo-300">{feature.icon}</div>
              <h2 className="text-md font-medium text-center text-white/90">{feature.title}</h2>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <a href="/Chat">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-medium hover:opacity-90 transition-all">
              Enter Chat
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;