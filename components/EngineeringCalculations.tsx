
import React from 'react';
import { FunctionalMachineData } from '../types';

interface EngineeringCalculationsProps {
  data: FunctionalMachineData;
  onInfo: (title: string, content: string) => void;
}

const EngineeringCalculations: React.FC<EngineeringCalculationsProps> = ({ data }) => {
  const getIconForType = (tipo: string) => {
    const icons: Record<string, string> = {
      esfuerzo: '💪', torsion: '🌀', potencia: '⚙️',
      flexion: '↔️', pandeo: '⚡', default: '📊'
    };
    return icons[tipo.toLowerCase()] || icons.default;
  };

  const getSafetyClass = (fs: string) => {
    const factor = parseFloat(fs);
    if (factor >= 2) return 'border-l-4 border-[#39d353] bg-[#39d353]/10';
    if (factor >= 1.5) return 'border-l-4 border-[#ff6b35] bg-[#ff6b35]/10';
    return 'border-l-4 border-red-500 bg-red-500/10';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.calculos_ingenieria?.map((calc, idx) => (
        <div key={idx} className="glass-card p-6 border-l-4 border-[#ff6b35] hover:border-[#00d9ff] transition-all transform hover:translate-x-1">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">{getIconForType(calc.tipo)}</span>
              {calc.nombre}
            </h4>
            <span className="px-2 py-1 bg-[#00d9ff]/15 border border-[#00d9ff] text-[#00d9ff] text-[10px] font-bold uppercase tracking-wider">
              {calc.tipo}
            </span>
          </div>

          {calc.descripcion && (
            <p className="text-xs text-[#8b949e] mb-4">{calc.descripcion}</p>
          )}

          {calc.formula && (
            <div className="formula-box p-4 mb-4 font-mono text-sm text-[#39d353] overflow-x-auto">
              {calc.formula}
            </div>
          )}

          <div className="space-y-2 mb-4">
            {calc.variables?.map((v, vIdx) => (
              <div key={vIdx} className="flex justify-between items-center p-2 bg-[#0d1117] border-l-2 border-[#ff6b35] text-xs">
                <span className="font-bold text-[#ff6b35]">{v.simbolo} <span className="text-[#8b949e] font-normal">({v.descripcion})</span></span>
                <span className="font-bold text-[#00d9ff]">{v.valor}</span>
              </div>
            ))}
          </div>

          <div className="result-box p-4 text-center mb-4">
            <div className="text-[10px] text-[#8b949e] uppercase tracking-widest mb-1">Resultado Final</div>
            <div className="text-3xl font-bold text-[#00d9ff] drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]">
              {calc.resultado} <span className="text-sm font-normal text-[#8b949e]">{calc.unidad}</span>
            </div>
          </div>

          {calc.factor_seguridad && (
            <div className={`p-3 flex justify-between items-center rounded ${getSafetyClass(calc.factor_seguridad)}`}>
              <span className="text-xs font-bold uppercase">Factor Seguridad: {calc.factor_seguridad}</span>
              <span className="text-xs font-bold">
                {parseFloat(calc.factor_seguridad) >= 2 ? '✓ SEGURO' : 
                 parseFloat(calc.factor_seguridad) >= 1.5 ? '⚠ ACEPTABLE' : '✗ RIESGO'}
              </span>
            </div>
          )}

          {calc.interpretacion && (
            <div className="mt-4 p-3 bg-[#00d9ff]/5 border-l-2 border-[#00d9ff] text-[11px] text-[#8b949e] leading-relaxed">
              <strong className="text-[#00d9ff]">Interpretación:</strong> {calc.interpretacion}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EngineeringCalculations;
