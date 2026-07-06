
import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glassmorphism-card w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-blue-400 orbitron">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 leading-relaxed text-sm">{content}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
