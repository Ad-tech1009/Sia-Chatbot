// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Chat from './pages/Chat';
import Landing from './pages/Landing';

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
