import React from 'react';
import { useNavigate } from 'react-router';
import { FiPlus, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen = true, onClose, onNewChat }) => {
  const chats = [
    "Am I doing enough?",
    "What if I fail?",
    "I feel overwhelmed.",
    "Why can't I focus?"
  ];
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="w-72 h-screen bg-gray-950 p-5 border-r border-gray-800 flex flex-col fixed md:static z-40">
      {/* Enhanced Header */}
      <div className="mb-6 flex items-center justify-between">
        <div 
          className="cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-200 group-hover:from-indigo-200 group-hover:to-indigo-100 transition-all duration-300 tracking-tight">
            Sia
          </h1>
          <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-500/70 to-indigo-400/50 mt-1 group-hover:w-10 transition-all duration-300"></div>
        </div>

        {/* Close button - visible only on small screens */}
        <button
          onClick={onClose}
          className="md:hidden p-2 text-gray-400 hover:text-indigo-300 transition"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* New Chat Button */}
      <button 
        className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 mb-6 border border-gray-700 hover:border-gray-600"
        onClick={onNewChat}
      >
        <FiPlus size={16} className="text-indigo-300" />
        <span>New Chat</span>
      </button>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        <p className="text-xs uppercase text-gray-500 tracking-wider mb-3 px-2">
          Recent Thoughts
        </p>
        <div className="space-y-1">
          {chats.map((chat, idx) => (
            <div
              key={idx}
              className="hover:bg-gray-800/70 cursor-pointer px-3 py-2.5 rounded-md transition-colors duration-200 text-gray-300 text-sm"
              onClick={() => {/* Load chat logic */}}
            >
              <p className="truncate">{chat}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-auto">
        <div 
          className="text-xs text-gray-500 hover:text-indigo-300 cursor-pointer transition-colors"
          onClick={() => navigate('/about')}
        >
          About Sia
        </div>
      </div>
    </div>
  );
};

export default Sidebar;