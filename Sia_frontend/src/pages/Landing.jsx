import { Link } from 'react-router'; // Use react-router-dom if you're on v6+
import Orb from '../components/Orb';

const Landing = () => {

  return (
    <div className="text-white bg-black overflow-hidden">
      {/* Orb Section */}
      <div className="relative h-screen flex flex-col items-center justify-center">
        <div style={{ width: '400px', height: '400px', position: 'relative' }}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-2xl font-bold text-white">Hi, I'm Sia</h1>
            <p className="mt-2 text-lg text-white">Your friendly companion</p>
          </div>
        </div>

        {/* Side-by-side Buttons */}
        <div className="mt-10 flex flex-row items-center space-x-4">
          <Link to="/Chat">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 shadow-lg transition-all duration-300">
              Start Chatting
            </button>
          </Link>
          <Link to="/about">
            <button className="px-6 py-3 rounded-lg border border-purple-500 text-purple-400 hover:text-white hover:bg-purple-600 transition-all duration-300">
              Learn What Sia Does
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
