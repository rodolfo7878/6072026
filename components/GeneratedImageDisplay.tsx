
import React from 'react';

interface GeneratedImageDisplayProps {
  src: string;
  alt: string;
  label: string;
}

const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ src, alt, label }) => {
  return (
    <div className="glass-card overflow-hidden group relative flex flex-col bg-[#1c2128] border-t-4 border-[#00d9ff] shadow-xl">
      <div className="p-3 bg-[#0d1117] border-b border-[#30363d] flex justify-between items-center">
        <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-widest">{label}</span>
        <div className="flex gap-1 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8b949e]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#8b949e]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#8b949e]"></div>
        </div>
      </div>
      
      <div className="aspect-[16/10] relative bg-[#f0f6fc] overflow-hidden flex items-center justify-center p-6 scanline">
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="max-w-full max-h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 rounded bg-[#30363d]/20 mb-3"></div>
            <div className="h-2 w-32 bg-[#30363d]/20 rounded"></div>
          </div>
        )}
        
        {/* Overlay for blueprint effect */}
        <div className="absolute inset-0 bg-[#00d9ff1a] pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="p-3 text-[9px] text-[#8b949e] font-mono flex justify-between uppercase tracking-widest">
        <span>ISO 128-1:2020 / ANSI Y14.5</span>
        <span className="text-[#00d9ff]/50">MECH-AI DRAWING ENGINE</span>
      </div>
    </div>
  );
};

export default GeneratedImageDisplay;
