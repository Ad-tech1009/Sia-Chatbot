// App.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FiSend } from 'react-icons/fi';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/test/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: { user_input: input } }),
      });

      const data = await response.json();
      const botMessage = { role: 'sia', content: data.output || 'Sia is thinking...' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'sia', content: 'Oops! Something went wrong.' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex h-screen font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-50 to-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
            <div className="text-center text-purple-400 text-xl mt-20">
            Go on, tell me what you're overthinking!
            </div>
        ) : (
            messages.map((msg, idx) => (
            <div
                key={idx}
                className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
                <div
                className={`inline-block px-4 py-3 rounded-2xl shadow-md break-words ${
                    msg.role === 'user'
                    ? 'bg-white text-purple-900 rounded-br-none'
                    : 'bg-purple-100 text-purple-800 rounded-bl-none'
                }`}
                style={{ maxWidth: '80%' }}
                >
                {msg.content}
                </div>
            </div>
            ))
        )}
        </div>
        {/* Chat Input */}
        <div className="px-6 pb-6">
        <div className="flex items-center bg-white rounded-2xl shadow-xl border border-purple-100 px-4 py-3 space-x-3">
            <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent focus:outline-none text-purple-800 placeholder-purple-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button
            onClick={handleSend}
            className="bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-full p-2 transition"
            >
            <FiSend size={20} />
            </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
