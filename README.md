# Sia: Emotion-Aware Chat Companion 🧘‍♀️

Sia is an interactive web-based chatbot that blends fun, introspection, and wisdom. Powered by LLMs and designed with smooth animations, Sia responds based on user mood and context, offering an immersive experience inspired by Hindu scriptures.

---

## 🧠 Features

- 🎨 Emotion-aware background changes using animated wave threads
- 🗨️ Context-aware responses with vector-based retrieval (RAG)
- 🎭 Lightweight UI/UX built with React and Tailwind CSS
- ⚡ Fast LLM backend using Ollama (Mistral) served through Python
- 📚 Scriptural base: Bhagavad Gita (with expansion plans)

> 🛠️ *Planned Features:*
> - Mini-games and playful interactions  
> - Scripture exploration mode  
> - Voice and facial emotion support  
> - Fine-tuned LLaMA model for deeper understanding  

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
![Screenshot 2025-04-18 172300](https://github.com/user-attachments/assets/1466b897-b3ac-4e71-9ab5-9b74da1f648e)


🤝 Contributions
Feel free to open issues, submit PRs, or suggest features.
Let’s make Sia smarter and more fun together 🙌

✨ Author
Made by Ad-tech1009 
