import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-8 py-4 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-purple-700">Sia</h1>
        <Link to="/chat">
          <button className="bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition">
            Login
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-6xl font-extrabold text-purple-700 mb-4">Sia</h2>

        <p className="text-lg text-purple-600 mb-1">
          Full-time overthinker and your unofficial emotional support human
        </p>
        <p className="text-md text-purple-500 italic mb-6">
          Certified expert in making sense of the mess inside your head
        </p>

        {/* Optional Divider or tagline */}
        <div className="w-20 h-1 bg-purple-200 rounded-full mb-6"></div>

        {/* Let's Talk Button */}
        <Link to="/chat">
          <button className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-800 transition shadow-lg">
            Let’s Talk
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
