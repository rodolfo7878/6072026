
import React from 'react';

interface HeaderProps {
  onHelp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHelp }) => {
  return (
    <header className="w-full flex flex-col items-center mb-8 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-white orbitron tracking-tighter">
          MECH<span className="text-blue-500">DESIGN</span> AI
        </h1>
      </div>
      <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        AI-DRIVEN MECHANICAL ENGINEERING ENGINE
        <button 
          onClick={onHelp}
          className="ml-2 text-slate-400 hover:text-blue-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </button>
      </p>
    </header>
  );
};

export default Header;
