// Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router';

const Sidebar = () => {
  const chats = [
    "Am I doing enough?",
    "What if I fail?",
    "I feel overwhelmed.",
    "Why can’t I focus?"
  ];
  const navigate = useNavigate();
  return (
    <div className="w-72 h-screen bg-gradient-to-b from-slate-950 to-black p-5 border-r border-slate-800 shadow-md flex flex-col text-white">
      <h1 className="text-3xl font-bold text-teal-300 mb-8 tracking-wide" onClick={() => navigate('/')}>
        Sia
      </h1>

      <button className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 mb-8 shadow-lg">
        + New Chat
      </button>

      <div className="text-sm text-slate-300 space-y-5">
        <p className="uppercase text-xs text-slate-500 tracking-widest">Thoughts Today</p>
        {chats.map((chat, idx) => (
          <div
            key={idx}
            className="hover:bg-slate-800 cursor-pointer px-3 py-2 rounded-lg transition-colors duration-200"
          >
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
