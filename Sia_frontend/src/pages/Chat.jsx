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
    <div className="min-h-screen bg-black font-sans text-white flex items-center justify-center p-4">
      <div className="flex w-full max-w-[1400px] h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <Sidebar />

        <div className="flex-1 flex flex-col relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 text-xl mt-20">
                Go on, tell me what you're overthinking.
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`inline-block px-5 py-3 rounded-2xl text-sm shadow-md break-words ${
                      msg.role === 'user'
                        ? 'bg-teal-700 text-white rounded-br-none'
                        : 'bg-gray-800 text-gray-100 rounded-bl-none'
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
          <div className="px-6 py-5 border-t border-gray-800 bg-black/90 backdrop-blur">
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded-full px-4 py-3 shadow-inner">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent focus:outline-none text-white placeholder-gray-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSend}
                className="ml-3 bg-teal-700 hover:bg-teal-600 text-white rounded-full p-2 transition"
              >
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
