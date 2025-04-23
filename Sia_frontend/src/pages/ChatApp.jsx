import React, { useState, useEffect, useRef } from 'react';
import {IoMenu } from 'react-icons/io5';
import Sidebar from '../components/Sidebar';
import MoodWave from '../components/MoodWave';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

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

const moodColors = {
  happy:     ["#A8C0FF", "#D1B3FF", "#E0C3FC"], // soft periwinkle to lavender
  calm:      ["#B8C1EC", "#A2A8D3", "#D3C1E5"], // muted blue-lavender tones
  sad:       ["#4B4E6D", "#5C5470", "#726A95"], // dusky purple-blues
  angry:     ["#5F4B8B", "#725A9C", "#8A6BBE"], // rich purples without harsh reds
  thoughtful:["#9A8C98", "#BFA2DB", "#D3BBDD"], // soft lilac and misty violets
  energetic: ["#8896E3", "#A29BFE", "#B7A7F9"], // brighter lavenders, still smooth
  anxious:   ["#667292", "#7788A5", "#8A9EB7"], // cool and subdued blue-grays
};



function ChatApp() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState("calm");
  const [lastMoodChangeTime, setLastMoodChangeTime] = useState(Date.now());
  const bottomRef = useRef(null);
  const lastMoodRef = useRef("calm");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const fetchMood = async (input) => { 
    try { 
      const res = await fetch("http://localhost:8000/detect_mood", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ user_input: input }), 
      }); 
      const data = await res.json(); 
      const detected = data.mood || "calm"; 
      const timeSinceLastChange = Date.now() - lastMoodChangeTime;
      if (detected !== lastMoodRef.current && timeSinceLastChange > 2000) { 
        lastMoodRef.current = detected; 
        setCurrentMood(detected); 
        setLastMoodChangeTime(Date.now());
      } 
    } 
    catch (err) { 
      console.error("Mood detection failed", err); 
    } 
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      fetchMood(input);
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
    <div className="flex h-screen overflow-hidden bg-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
      />
  
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 h-full relative">
        {/* Header/Menu Button for small screens */}
        <button
          className={`md:hidden absolute top-4 left-4 z-50 p-2 rounded-lg bg-gray-800/90 backdrop-blur-sm ${
            isSidebarOpen ? 'hidden' : 'block'
          }`}
          onClick={() => setIsSidebarOpen(true)}
        >
          <IoMenu size={24} />
        </button>
  
        {/* Background Animation (MoodWave) */}
        <div className="absolute inset-x-0 top-0 h-[200px] z-0 pointer-events-none">
          <MoodWave
            colorStops={moodColors[currentMood] || moodColors["calm"]}
            blend={0.5}
            amplitude={0.5}
            speed={0.5}
          />
        </div>
  
        {/* Scrollable Messages */}
        <div className="flex-1 overflow-y-auto px-4 pb-28 pt-6 space-y-4 z-10">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-2xl font-light text-indigo-300 mb-2 sm:text-3xl md:text-4xl">
                Hi, I'm Sia
              </h2>
              <p className="text-gray-400 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                Your friendly AI companion. Ask me anything or share what's on your mind.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatWindow key={msg.id} msg={msg} handleFeedback={handleFeedback} />
            ))
          )}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef}></div>
        </div>
  
        {/* Sticky Input */}
        <div className="absolute bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 z-20">
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isTyping={isTyping}
          />
        </div>
      </div>
    </div>
  );  
}

export default ChatApp;