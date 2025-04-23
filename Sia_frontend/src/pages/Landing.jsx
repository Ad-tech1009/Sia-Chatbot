import { Link } from 'react-router'; 
import Orb from '../components/Orb';

const Landing = () => {
  return (
    <div className="text-white bg-black overflow-hidden">
      {/* Top Right Auth Buttons */}
      {/* <div className="absolute top-4 right-6 z-50 flex space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 text-sm rounded-md bg-transparent text-indigo-300 hover:text-white hover:bg-indigo-900/40 border border-indigo-500/30 hover:border-indigo-400 transition-all duration-200">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 text-sm rounded-md bg-indigo-700 text-white hover:bg-indigo-600 transition-all duration-200 border border-indigo-500/30">
            Sign Up
          </button>
        </Link>
      </div> */}

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
            <button className="px-6 py-3 rounded-lg bg-indigo-700 text-white font-medium hover:bg-indigo-600 transition-all duration-200 border border-indigo-500/30 shadow-sm hover:shadow-indigo-500/20">
              Start Chatting
            </button>
          </Link>

          <Link to="/about">
            <button className="px-6 py-3 rounded-lg bg-transparent text-indigo-300 font-medium hover:text-white hover:bg-indigo-900/30 transition-all duration-200 border border-indigo-500/30 hover:border-indigo-400">
              Learn What Sia Does
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
