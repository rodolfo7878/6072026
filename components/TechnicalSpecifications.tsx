
import React from 'react';
import { FunctionalMachineData } from '../types';

interface TechnicalSpecificationsProps {
  data: FunctionalMachineData;
  onInfo: (title: string, content: string) => void;
}

const TechnicalSpecifications: React.FC<TechnicalSpecificationsProps> = ({ data, onInfo }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.dimensiones && (
          <div className="glassmorphism-card p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Dimensiones Generales</h4>
            <div className="grid grid-cols-3 gap-3">
              {['largo', 'ancho', 'alto'].map((dim) => (
                <div key={dim} className="p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-center">
                  <div className="text-[9px] text-slate-500 uppercase font-bold">{dim}</div>
                  <div className="text-sm font-bold text-white">{(data.dimensiones as any)[dim] || '-'}</div>
                </div>
              ))}
              <div className="col-span-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 flex justify-between">
                <span className="text-[9px] text-slate-500 uppercase font-bold">Tolerancia Gral:</span>
                <span className="text-xs text-blue-400 font-mono">{data.dimensiones.tolerancias || 'ISO 2768-m'}</span>
              </div>
            </div>
          </div>
        )}

        {data.especificaciones_tecnicas && (
          <div className="glassmorphism-card p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Parámetros Críticos</h4>
            <div className="grid grid-cols-2 gap-4">
               {Object.entries(data.especificaciones_tecnicas).map(([key, val]) => (
                 <div key={key} className="flex flex-col">
                   <span className="text-[9px] text-slate-500 uppercase font-bold">{key.replace('_', ' ')}</span>
                   <span className="text-sm font-bold text-blue-300">{val as string}</span>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      <div className="glassmorphism-card p-5 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Consideraciones de Seguridad Industrial</h4>
        <div className="p-4 bg-amber-950/20 border-l-4 border-amber-500 rounded-r text-amber-200 text-xs leading-relaxed">
          {data.consideraciones_seguridad}
        </div>
      </div>

      {data.normas_aplicables && data.normas_aplicables.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.normas_aplicables.map((norma, i) => (
            <span key={i} className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-400 text-[10px] font-mono rounded uppercase">
              {norma}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnicalSpecifications;
