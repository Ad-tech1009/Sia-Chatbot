# Sia: Emotion-Aware Chat Companion 🌸✨

Sia (She Is Always-here) is an interactive web-based chatbot that blends fun, introspection, and wisdom. Designed to feel like a calming, emotionally aware companion, Sia adapts to your tone, responds with warmth, and reflects insights from ancient philosophy. Powered by LLMs and crafted with smooth, expressive animations, Sia offers a deeply personal and immersive chat experience inspired by Hindu scriptures and Stoic thought.

---

## 🧠 Features
- 🎨 Emotion-aware background changes using animated wave threads  
  Visuals adapt in real time to match the tone and emotion of your conversation.
- 🗨️ Context-aware responses with vector-based retrieval (RAG)  
  Uses Retrieval-Augmented Generation to pull contextually relevant insights, particularly from sacred texts like the Bhagavad Gita.
- 🎭 Lightweight UI/UX built with React and Tailwind CSS  
  A clean, mobile-friendly interface that feels both modern and personal.
- ⚡ Fast LLM backend using Ollama (Mistral) served through Python  
  Local and efficient — runs fully offline-capable using FastAPI and Ollama.
- 📚 Scriptural base: Bhagavad Gita (with expansion plans)  
  Offers subtle reflections and grounded advice inspired by timeless spiritual teachings.
- 🧘‍♀️ Human-like persona: calm, emotionally intelligent, and adaptive  
  Sia is designed to sound less like a bot and more like a friend — supportive, informal, and subtly wise. Responses adjust in tone based on mood and topic.
- 🧠 Mood wave engine (visual + semantic)  
  Tracks the emotional progression of a conversation, influencing Sia's demeanor and background colors in real time.

> 🛠️ Planned Features:
> - 🎮 Mini-games and playful interactions (e.g., Mood Mirror, Reflection Cards)  
> - 📖 Scripture exploration mode with quotes and commentary  
> - 🎤 Voice and facial emotion support (voice tone, webcam face reading - opt-in) 
> - 🧬 Fine-tuned LLaMA model for deeper emotional and philosophical understanding 
> - 🔄 Memory module to remember user preferences and moods over time (opt-in)  
> - 🛡️ Ethical safeguards for sensitive topics (mental health, legal, etc.) with safe fallback responses  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ad-tech1009/Sia-Chatbot.git
cd Sia-Chatbot
```
2. 🧠 LLM Backend Setup (llm_server)
⚠️ Make sure you have Ollama installed and the Mistral model available.
```bash
cd llm_server
pip install -r requirements.txt
ollama run mistral  # Ensure Mistral is pulled and running
python server.py    # Starts FastAPI server on port 8000
```

3. 🌐 Frontend Setup (sia_frontend)
```bash
Copy
Edit
cd sia_frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

🧩 Technologies Used

Frontend: React.js, Tailwind CSS, Vite

Backend: Python, FastAPI, Ollama, LangChain

Vector DB: ChromaDB

Model: Mistral (via Ollama)

📸 Screenshots
![Screenshot 2025-04-20 220341](https://github.com/user-attachments/assets/1aa67f6f-d5ee-4afd-86df-adee8f2406e6)

![image](https://github.com/user-attachments/assets/384177e2-1a65-4573-bb3e-af33b2b36171)


🤝 Contributions
Feel free to open issues, submit PRs, or suggest features.
Let’s make Sia smarter and more fun together 🙌

✨ Author
Made by Ad-tech1009 
