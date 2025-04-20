import React, { useState, useEffect } from 'react';
import { IoSend, IoMenu } from 'react-icons/io5';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import MoodWave from '../components/MoodWave';

const Message = ({ msg, handleFeedback }) => (
  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[90%] md:max-w-[70%] px-4 py-3 rounded-xl break-words whitespace-pre-wrap
      ${msg.role === 'user' ? 'bg-indigo-700 text-white rounded-br-none' : 'bg-gray-800 text-gray-100 rounded-bl-none'}`}
    >
      {msg.content}
      {msg.role === 'sia' && (
        <div className="flex justify-end mt-2 space-x-2">
          <button
            onClick={() => handleFeedback(msg.id, true)}
            className={`p-1 ${msg.feedback === true ? 'text-green-400' : 'text-gray-400 hover:text-green-400'}`}
          >
            <FiThumbsUp size={16} />
          </button>
          <button
            onClick={() => handleFeedback(msg.id, false)}
            className={`p-1 ${msg.feedback === false ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
          >
            <FiThumbsDown size={16} />
          </button>
        </div>
      )}
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-gray-800 px-4 py-3 rounded-xl rounded-bl-none max-w-[70%]">
      <div className="flex space-x-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  </div>
);

const ChatInput = ({ input, setInput, handleSend, isTyping }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="p-4 border-t border-gray-800 bg-gray-900">
      <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2">
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
          className={`ml-3 p-2 rounded-lg transition-colors duration-200
            ${input.trim() && !isTyping ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
        >
          <IoSend size={18} />
        </button>
      </div>
    </footer>
  );
};

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, id: Date.now() };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/siat1/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: { user_input: input } }),
      });

      const data = await response.json();
      const botMessage = {
        role: 'sia',
        content: data.output || 'Sia is thinking...',
        id: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'sia',
        content: 'Oops! Something went wrong.',
        id: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFeedback = (messageId, isPositive) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, feedback: isPositive } : msg
    ));
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col md:flex-row bg-gray-950 text-white overflow-hidden">
        {/* MoodWave Background */}
        <div className="absolute left-0 w-full h-[200px] z-0 pointer-events-none">
          <MoodWave
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* Sidebar Toggle */}
        <button
          className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800/90 backdrop-blur-sm ${isSidebarOpen ? 'hidden' : 'block'}`}
          onClick={() => setIsSidebarOpen(true)}
        >
          <IoMenu size={24} />
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNewChat={handleNewChat} />

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-screen md:h-auto relative z-10">
          <section className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
            {Array.isArray(messages) && messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <h2 className="text-2xl font-light text-indigo-300 mb-2">Hi, I'm Sia</h2>
                <p className="text-gray-400 max-w-md">
                  Your friendly AI companion. Ask me anything or share what's on your mind.
                </p>
              </div>
            ) : (
              messages.map(msg => <Message key={msg.id} msg={msg} handleFeedback={handleFeedback} />)
            )}
            {isTyping && <TypingIndicator />}
          </section>
          <ChatInput input={input} setInput={setInput} handleSend={handleSend} isTyping={isTyping} />
        </main>
      </div>
    </>
  );
}

export default Chat;