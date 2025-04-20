import React from 'react';
import { FaBrain, FaLaughSquint, FaBookOpen, FaBalanceScale } from 'react-icons/fa';
import Threads from '../components/Threads';

const features = [
  { 
    icon: <FaBrain className="text-3xl group-hover:rotate-12 transition-transform" />, 
    title: 'Mood Waves',
    description: 'Adapts to your emotional tone'
  },
  { 
    icon: <FaLaughSquint className="text-3xl group-hover:scale-110 transition-transform" />, 
    title: 'Banter Battle',
    description: 'Playful AI-powered word games' 
  },
  { 
    icon: <FaBookOpen className="text-3xl group-hover:-rotate-6 transition-transform" />, 
    title: 'Scripture Arcade',
    description: 'Bible verses in interactive formats' 
  },
  { 
    icon: <FaBalanceScale className="text-3xl group-hover:rotate-6 transition-transform" />, 
    title: 'Respect Mode',
    description: 'Strictly PG conversations' 
  },
];

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <Threads className="absolute inset-0 z-0 opacity-20" />

      <div className="relative z-10 px-4 py-12 sm:py-16 w-full flex flex-col items-center">
        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Meet Sia
          </h1>
          <div className="w-16 h-0.5 bg-indigo-400 mx-auto mt-3" />
        </div>

        {/* Feature Grid with hover descriptions */}
        <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-gray-700 bg-gray-900/60 hover:bg-gray-800 transition-all duration-200 cursor-pointer"
              aria-label={`${feature.title}: ${feature.description}`}
            >
              {/* Icon + Title (always visible) */}
              <div className="mb-4 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                {feature.icon}
              </div>
              <h2 className="text-sm sm:text-base font-medium text-center text-gray-100 group-hover:text-white">
                {feature.title}
              </h2>

              {/* Description (appears on hover) */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[120%] px-2 py-1 text-xs text-center text-gray-300 bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                {feature.description}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-14 sm:mt-16">
          <a 
            href="/Chat" 
            className="block hover:-translate-y-0.5 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-full"
          >
            <button className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow hover:shadow-indigo-500/20 transition-all duration-200 active:scale-[0.98]">
              Enter Chat
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;