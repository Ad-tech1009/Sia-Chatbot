import React from "react";
import { IoSend } from "react-icons/io5";

const ChatInput = ({ input, setInput, handleSend, isTyping }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="w-full max-w-4xl mx-auto flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2 shadow-md">
        <input
          type="text"
          placeholder="Message Sia..."
          className="flex-1 bg-transparent focus:outline-none text-white placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            input.trim() && !isTyping
              ? "bg-indigo-600 hover:bg-indigo-500 text-white"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          <IoSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
