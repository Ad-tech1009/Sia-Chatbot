// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ChatApp from './pages/ChatApp';
import Landing from './pages/Landing';
import About from './pages/About';

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<ChatApp />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
