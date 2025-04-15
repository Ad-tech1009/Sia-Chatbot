import { useState, useRef, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Namaste! I'm Sia, your spiritual companion. How are you feeling today?",
      sender: 'sia'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Colors inspired by Hindu spirituality:
  // Turquoise (calm), Saffron (energy), Deep Purple (spirituality), Cream (softness)
  const colors = {
    siaBackground: 'bg-[#2dd4bf]', // Turquoise
    userBackground: 'bg-[#f59e0b]', // Saffron
    siaText: 'text-[#1e1b4b]', // Deep purple
    userText: 'text-white',
    appBackground: 'bg-[#faf6e9]', // Cream
    inputBackground: 'bg-white',
    buttonBackground: 'bg-[#7e22ce]', // Purple
    buttonHover: 'hover:bg-[#6b21a8]'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate Sia's response after a short delay
    setTimeout(() => {
      // In a real app, this would call your AI API
      const responses = [
        "The Bhagavad Gita teaches us that every experience, pleasant or painful, is temporary. Can you tell me more about what's on your mind?",
        "Like the lotus flower that blooms in muddy waters, we too can rise above our challenges. What wisdom are you seeking today?",
        "Krishna says in the Gita: 'Yoga is the journey of the self, through the self, to the self.' How can I help guide you on your journey?",
        "In Hindu philosophy, every emotion has value. Your feelings are valid. Would you like to explore them together?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages([...newMessages, { text: randomResponse, sender: 'sia' }]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${colors.appBackground} p-4 flex flex-col`}>
      <header className="text-center mb-6">
        <h1 className={`text-3xl font-bold ${colors.siaText}`}>Sia</h1>
        <p className={`${colors.siaText} opacity-70`}>Your spiritual AI companion</p>
      </header>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === 'sia' ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-xs md:max-w-md rounded-lg p-4 ${message.sender === 'sia' ? 
                `${colors.siaBackground} ${colors.siaText}` : 
                `${colors.userBackground} ${colors.userText}`}`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className={`flex-1 ${colors.inputBackground} rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7e22ce]`}
          placeholder="Share your thoughts..."
        />
        <button
          onClick={handleSendMessage}
          className={`${colors.buttonBackground} ${colors.buttonHover} text-white rounded-full px-6 py-2 shadow-md transition-colors`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;