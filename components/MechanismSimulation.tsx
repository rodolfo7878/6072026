
import React, { useState, useEffect } from 'react';
import { FunctionalMachineData } from '../types';
import { generateOperationalRender } from '../services/geminiService';

interface MechanismSimulationProps {
  data: FunctionalMachineData;
}

const MechanismSimulation: React.FC<MechanismSimulationProps> = ({ data }) => {
  const [operationalRender, setOperationalRender] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [telemetry, setTelemetry] = useState({ rpm: 0, temp: 0, load: 0 });
  const [status, setStatus] = useState<'IDLE' | 'OPERATIONAL' | 'STRESS_TEST'>('OPERATIONAL');

  useEffect(() => {
    const fetchRender = async () => {
      setIsGenerating(true);
      try {
        const render = await generateOperationalRender(
          data.nombre,
          data.objetivo_funcional,
          data.lista_materiales?.map(m => m.item) || []
        );
        setOperationalRender(render);
      } catch (error) {
        console.error("Error generating operational render:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    fetchRender();
  }, [data]);

  // Simulación de telemetría dinámica
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        rpm: Math.floor(1200 + Math.random() * 500),
        temp: Math.floor(45 + Math.random() * 5),
        load: Math.floor(65 + Math.random() * 15)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header de Simulación Visual */}
      <div className="glass-card p-6 border-l-4 border-[#ff6b35] relative overflow-hidden bg-[#161b22]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="archivo-black text-xl text-[#ff6b35] uppercase tracking-tighter">Captura de Operación Real</h3>
            <p className="text-xs text-[#8b949e]">Visualización fotorrealista del dispositivo en entorno industrial activo.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setStatus('OPERATIONAL')}
              className={`px-3 py-1 text-[10px] font-bold border ${status === 'OPERATIONAL' ? 'bg-[#39d353]/10 border-[#39d353] text-[#39d353]' : 'border-[#30363d] text-[#8b949e]'}`}
            >
              MODO_NORMAL
            </button>
            <button 
              onClick={() => setStatus('STRESS_TEST')}
              className={`px-3 py-1 text-[10px] font-bold border ${status === 'STRESS_TEST' ? 'bg-red-500/10 border-red-500 text-red-500' : 'border-[#30363d] text-[#8b949e]'}`}
            >
              TEST_ESFUERZO
            </button>
          </div>
        </div>
      </div>

      {/* Monitor Principal */}
      <div className="relative glass-card border-2 border-[#30363d] overflow-hidden bg-black shadow-2xl">
        <div className="aspect-video relative flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-[#ff6b35]/20 border-t-[#ff6b35] rounded-full animate-spin"></div>
              <div className="text-[#ff6b35] font-mono text-xs animate-pulse tracking-[0.2em] uppercase">Renderizando Gemelo Digital...</div>
            </div>
          ) : operationalRender ? (
            <>
              <img 
                src={operationalRender} 
                alt="Operational Rendering" 
                className={`w-full h-full object-cover transition-opacity duration-1000 ${status === 'STRESS_TEST' ? 'opacity-70 saturate-150' : 'opacity-90'}`}
              />
              
              {/* Overlays de Telemetría (HUD) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Cuatro esquinas decorativas */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#ff6b35]/50"></div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#ff6b35]/50"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#ff6b35]/50"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#ff6b35]/50"></div>

                {/* Datos Dinámicos */}
                <div className="absolute top-10 left-10 space-y-4">
                   <div className="bg-black/60 p-3 border-l-2 border-[#39d353] backdrop-blur-sm">
                      <div className="text-[9px] text-[#8b949e] font-bold uppercase mb-1">Status Sistema</div>
                      <div className={`text-sm font-black font-mono ${status === 'STRESS_TEST' ? 'text-red-500' : 'text-[#39d353]'}`}>
                        {status === 'STRESS_TEST' ? '⚠️ CRITICAL_LOAD' : '● NOMINAL_OP'}
                      </div>
                   </div>
                   <div className="bg-black/60 p-3 border-l-2 border-[#00d9ff] backdrop-blur-sm">
                      <div className="text-[9px] text-[#8b949e] font-bold uppercase mb-1">Telemetría Local</div>
                      <div className="text-xs font-mono text-[#00d9ff]">
                        RPM: {status === 'STRESS_TEST' ? telemetry.rpm + 800 : telemetry.rpm}<br/>
                        TEMP: {status === 'STRESS_TEST' ? telemetry.temp + 30 : telemetry.temp}°C<br/>
                        LOAD: {status === 'STRESS_TEST' ? '98.2%' : telemetry.load + '%'}
                      </div>
                   </div>
                </div>

                {/* Etiqueta de Identificación */}
                <div className="absolute bottom-10 right-10 text-right space-y-1">
                   <div className="bg-[#ff6b35] text-black px-3 py-0.5 text-[10px] font-black uppercase tracking-widest inline-block">
                     {data.nombre}
                   </div>
                   <div className="text-[9px] text-white/50 font-mono bg-black/40 px-2 py-1">
                     RENDER_ID: GEN-{Math.random().toString(36).substring(7).toUpperCase()}
                   </div>
                </div>

                {/* Rejilla técnica sutil */}
                <div className="absolute inset-0 opacity-10 blueprint-grid-bg"></div>
              </div>
            </>
          ) : (
            <div className="text-[#8b949e] font-mono text-xs uppercase">Falla en la inicialización del motor de renderizado</div>
          )}

          {/* Efectos de Post-Procesado */}
          <div className="absolute inset-0 pointer-events-none scanline opacity-30"></div>
          {status === 'STRESS_TEST' && (
            <div className="absolute inset-0 pointer-events-none bg-red-500/5 animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Footer de Simulación: Detalles Técnicos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 bg-[#1c2128]">
          <h4 className="text-[9px] font-bold text-[#8b949e] uppercase mb-2">Entorno de Operación</h4>
          <p className="text-xs text-white leading-relaxed">
            El sistema ha sido visualizado en condiciones de carga nominal dentro de un entorno industrial controlado, aplicando texturas de {data.lista_materiales?.[0]?.item || 'metales técnicos'} y fluidos dinámicos.
          </p>
        </div>
        <div className="glass-card p-4 bg-[#1c2128]">
          <h4 className="text-[9px] font-bold text-[#8b949e] uppercase mb-2">Validación de Esfuerzos</h4>
          <div className="flex items-center gap-3">
             <div className="w-full bg-[#0d1117] h-2 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${status === 'STRESS_TEST' ? 'w-[95%] bg-red-500' : 'w-[65%] bg-[#39d353]'}`}></div>
             </div>
             <span className="text-[10px] font-mono font-bold text-white">{status === 'STRESS_TEST' ? '95%' : '65%'}</span>
          </div>
          <p className="text-[10px] text-[#8b949e] mt-2 italic">Coeficiente de seguridad aplicado: {data.calculos_ingenieria?.[0]?.factor_seguridad || '1.5'}</p>
        </div>
        <div className="glass-card p-4 bg-[#1c2128] flex items-center justify-center">
           <button 
             onClick={() => window.location.reload()}
             className="flex items-center gap-2 text-[10px] font-bold text-[#00d9ff] hover:text-white transition-colors uppercase tracking-widest"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
             Recalcular Visualización
           </button>
        </div>
      </div>
    </div>
  );
};

export default MechanismSimulation;
