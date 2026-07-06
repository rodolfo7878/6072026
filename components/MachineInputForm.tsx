
import React from 'react';
import { SUPPORTED_LANGUAGES } from '../types';

interface MachineInputFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
  initialDescription: string;
  setDescription: (text: string) => void;
  selectedLanguageCode: string;
  onLanguageChange: (code: string) => void;
  onInfo: () => void;
}

const MachineInputForm: React.FC<MachineInputFormProps> = ({
  onSubmit,
  isLoading,
  initialDescription,
  setDescription,
  selectedLanguageCode,
  onLanguageChange,
  onInfo
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="glassmorphism-card p-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            Requisitos del Diseño Mecánico
            <button 
              type="button" 
              onClick={onInfo}
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </label>
          <div className="flex items-center gap-2">
             <span className="text-[10px] text-slate-500 font-bold uppercase">Idioma:</span>
             <select 
               value={selectedLanguageCode}
               onChange={(e) => onLanguageChange(e.target.value)}
               className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 outline-none focus:border-blue-500"
             >
               {SUPPORTED_LANGUAGES.map(lang => (
                 <option key={lang.code} value={lang.code}>{lang.label}</option>
               ))}
             </select>
          </div>
        </div>

        <textarea
          value={initialDescription}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escriba el sistema mecánico deseado. Ej: Un elevador de carga hidráulico para 5 toneladas con altura máxima de 10 metros..."
          className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all min-h-[120px] resize-none"
          disabled={isLoading}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !initialDescription.trim()}
            className={`px-8 py-3 rounded-lg font-bold uppercase text-xs tracking-widest transition-all flex items-center gap-3 ${
              isLoading || !initialDescription.trim() 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Procesando...
              </>
            ) : (
              <>
                <span>Generar Ingeniería</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MachineInputForm;
