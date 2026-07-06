
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-8 border-t border-slate-900 text-center space-y-4">
      <div className="flex justify-center gap-6">
        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Engineering Precision
        </div>
        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
          Industrial Compliance
        </div>
        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          Physics Validation
        </div>
      </div>
      <p className="text-slate-600 text-xs">
        &copy; {new Date().getFullYear()} MechDesign AI. Powered by Google Gemini Pro & Flash.
      </p>
    </footer>
  );
};

export default Footer;
