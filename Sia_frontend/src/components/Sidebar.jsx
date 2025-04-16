// Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  const chats = [
    "Am I doing enough?",
    "What if I fail?",
    "I feel overwhelmed.",
    "Why can’t I focus?"
  ];

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-4 border-r border-purple-200 shadow-md flex flex-col">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 tracking-wide">Sia</h1>

      <button className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold py-2 px-4 rounded-lg transition mb-6 shadow-sm">
        + New Chat
      </button>

      <div className="text-sm text-purple-700 font-medium space-y-4">
        <p className="uppercase text-xs text-purple-500 tracking-wider">Thoughts Today</p>
        {chats.map((chat, idx) => (
          <div
            key={idx}
            className="hover:bg-purple-200/60 cursor-pointer px-2 py-1 rounded transition"
          >
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;