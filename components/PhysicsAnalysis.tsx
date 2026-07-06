
import React from 'react';
import { FunctionalMachineData } from '../types';

interface PhysicsAnalysisProps {
  data: FunctionalMachineData;
  onInfo: (title: string, content: string) => void;
}

const PhysicsAnalysis: React.FC<PhysicsAnalysisProps> = ({ data }) => {
  const analysis = data.analisis_fisico;

  if (!analysis || (!analysis.fuerzas && !analysis.energia && !analysis.equilibrio)) {
    return (
      <div className="glass-card p-12 text-center text-[#8b949e]">
        <div className="text-4xl mb-4">🔬</div>
        <p className="text-sm font-bold uppercase tracking-widest">Análisis físico no disponible</p>
        <p className="text-xs mt-2">Los parámetros de equilibrio se derivan de los cálculos de ingeniería.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {analysis.fuerzas && analysis.fuerzas.length > 0 && (
        <div>
          <h4 className="text-[#ff6b35] font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>➡️</span> Vectores de Fuerza Actuantes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.fuerzas.map((f, idx) => (
              <div key={idx} className="p-5 bg-[#1c2128] border border-[#30363d] relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-lg font-bold text-white">{f.nombre}</div>
                    <div className="text-[10px] text-[#8b949e] uppercase font-bold">{f.tipo}</div>
                  </div>
                  <div className="text-2xl font-bold text-[#00d9ff]">{f.magnitud}</div>
                </div>
                
                {f.direccion && (
                  <p className="text-xs text-[#8b949e] mb-4"><strong>Dirección:</strong> {f.direccion}</p>
                )}

                {f.componentes && (
                  <div className="grid grid-cols-3 gap-2">
                    {['x', 'y', 'z'].map((axis) => (axis in f.componentes! ? (
                      <div key={axis} className={`p-2 border text-center ${
                        axis === 'x' ? 'bg-[#ff6b35]/10 border-[#ff6b35]' : 
                        axis === 'y' ? 'bg-[#39d353]/10 border-[#39d353]' : 
                        'bg-[#00d9ff]/10 border-[#00d9ff]'
                      }`}>
                        <div className={`text-[9px] uppercase font-bold ${
                          axis === 'x' ? 'text-[#ff6b35]' : 
                          axis === 'y' ? 'text-[#39d353]' : 
                          'text-[#00d9ff]'
                        }`}>F{axis}</div>
                        <div className="text-xs font-bold">{(f.componentes as any)[axis]}</div>
                      </div>
                    ) : null))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.equilibrio && (
        <div className="p-4 border-l-4 border-[#39d353] bg-[#39d353]/10 flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-[#39d353] uppercase tracking-wider">Equilibrio Estático Verificado</div>
            <div className="text-[11px] text-[#8b949e] mt-1 font-mono">
              ∑Fx = {analysis.equilibrio.suma_fuerzas_x || '0'} | 
              ∑Fy = {analysis.equilibrio.suma_fuerzas_y || '0'} | 
              ∑M = {analysis.equilibrio.suma_momentos || '0'}
            </div>
          </div>
          <span className="text-xl">✓</span>
        </div>
      )}

      {analysis.energia && (
        <div>
          <h4 className="text-[#ff6b35] font-bold text-sm uppercase tracking-widest mb-4">⚡ Balance Energético</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-[#1c2128] border border-[#30363d] text-center">
              <div className="text-[10px] text-[#8b949e] uppercase tracking-widest mb-1">Entrada</div>
              <div className="text-xl font-bold text-[#00d9ff]">{analysis.energia.entrada || 'N/A'}</div>
            </div>
            <div className="p-4 bg-[#1c2128] border border-[#30363d] text-center">
              <div className="text-[10px] text-[#8b949e] uppercase tracking-widest mb-1">Salida</div>
              <div className="text-xl font-bold text-[#39d353]">{analysis.energia.salida || 'N/A'}</div>
            </div>
          </div>

          <div className="result-box p-6 text-center">
            <div className="text-[10px] text-[#8b949e] uppercase tracking-widest mb-1">Eficiencia Total</div>
            <div className="text-4xl font-bold text-[#00d9ff] drop-shadow-[0_0_15px_rgba(0,217,255,0.6)]">{analysis.energia.eficiencia || '-%'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysicsAnalysis;
