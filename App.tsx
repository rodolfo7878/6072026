
import React, { useState, useCallback } from 'react';
import { FunctionalMachineData, GroundingSource, SUPPORTED_LANGUAGES } from './types';
import { generateFunctionalMachine, generateTechnicalBlueprint } from './services/geminiService';
import MachineInputForm from './components/MachineInputForm';
import GeneratedImageDisplay from './components/GeneratedImageDisplay';
import AssemblyGuide from './components/AssemblyGuide';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import HelpModal from './components/HelpModal';
import FullscreenButton from './components/FullscreenButton';
import EngineeringCalculations from './components/EngineeringCalculations';
import PhysicsAnalysis from './components/PhysicsAnalysis';
import TechnicalSpecifications from './components/TechnicalSpecifications';
import MechanismSimulation from './components/MechanismSimulation';

const App: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>('es');
  const [machineData, setMachineData] = useState<FunctionalMachineData | null>(null);
  const [blueprints, setBlueprints] = useState<{ view: string, url: string, error?: boolean }[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sim' | 'blueprints' | 'assembly' | 'bom' | 'calculations' | 'physics'>('blueprints');

  const [helpConfig, setHelpConfig] = useState<{ isOpen: boolean; title: string; content: string }>({
    isOpen: false, title: '', content: ''
  });

  const showHelp = (title: string, content: string) => {
    setHelpConfig({ isOpen: true, title, content });
  };

  const handleGenerate = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setLoadingStep('Analizando arquitectura y optimizando payload...');
    setError(null);
    setMachineData(null);
    setBlueprints([]);
    setSources([]);

    const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguageCode) || SUPPORTED_LANGUAGES[0];

    try {
      const { data, sources } = await generateFunctionalMachine(inputText, currentLanguage.name);
      
      setMachineData(data);
      setSources(sources);
      setLoadingStep('Generando documentación técnica visual...');

      const views = (data.vistas_necesarias || ["Vista frontal", "Vista lateral", "Vista superior", "Vista isométrica"]).slice(0, 4);
      const blueprintPromises = views.map(async (view) => {
        try {
          const url = await generateTechnicalBlueprint(
            data.nombre, 
            view, 
            data.componentes_mecanicos_clave || []
          );
          return { view, url };
        } catch (e) {
          return { view, url: '', error: true };
        }
      });

      const results = await Promise.all(blueprintPromises);
      setBlueprints(results);

    } catch (e: any) {
      console.error("Critical Generation Error:", e);
      setError(e.message || "Error en el motor de diseño. La IA no pudo completar el flujo JSON.");
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  }, [selectedLanguageCode]);

  return (
    <div className="min-h-screen p-4 md:p-12 max-w-7xl mx-auto space-y-8">
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <FullscreenButton />
      </div>

      <header className="text-center py-12 px-6 glass-card border-t-4 border-[#00d9ff] relative overflow-hidden group">
        <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-[#00d9ff1a] to-transparent group-hover:animate-[slide_8s_infinite] pointer-events-none"></div>
        <h1 className="archivo-black text-4xl md:text-6xl tracking-widest uppercase bg-gradient-to-r from-[#00d9ff] to-[#39d353] bg-clip-text text-transparent mb-2 drop-shadow-[0_0_20px_rgba(0,217,255,0.3)]">
          MECHDESIGN AI
        </h1>
        <p className="text-[#8b949e] text-xs font-bold tracking-[0.3em] uppercase">IA de Ingeniería Mecánica Predictiva</p>
      </header>

      <MachineInputForm 
        onSubmit={handleGenerate} 
        isLoading={isLoading} 
        initialDescription={description} 
        setDescription={setDescription}
        selectedLanguageCode={selectedLanguageCode}
        onLanguageChange={setSelectedLanguageCode}
        onInfo={() => showHelp("Guía de Diseño", "Ingrese requerimientos funcionales claros para obtener mejores resultados en el balance de carga.")}
      />

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
          <LoadingSpinner />
          <div className="space-y-2">
            <div className="text-[#00d9ff] font-bold text-xl animate-pulse uppercase tracking-wider">{loadingStep}</div>
            <div className="text-[#8b949e] text-xs max-w-xs mx-auto">
              Estamos procesando una gran cantidad de datos de ingeniería. Esto puede tardar unos segundos mientras validamos la integridad estructural.
            </div>
          </div>
        </div>
      )}
      
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

      {machineData && !isLoading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="glass-card p-8 border-l-4 border-[#ff6b35]">
            <h2 className="archivo-black text-2xl text-[#00d9ff] mb-4 uppercase flex items-center gap-3">
              <span>🔧</span> {machineData.nombre}
            </h2>
            <p className="text-[#8b949e] text-sm leading-relaxed mb-8">{machineData.objetivo_funcional}</p>
            
            {machineData.especificaciones_tecnicas && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(machineData.especificaciones_tecnicas).map(([key, val]) => (
                  <div key={key} className="p-4 bg-[#1c2128] border border-[#30363d] border-l-4 border-[#a371f7] text-center">
                    <div className="text-[10px] text-[#8b949e] uppercase font-bold tracking-tighter mb-1">{key.replace(/_/g, ' ')}</div>
                    <div className="text-sm font-bold text-[#00d9ff]">{val as string}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 border-b border-[#30363d] overflow-x-auto pb-0 scrollbar-hide">
            <TabButton active={activeTab === 'blueprints'} onClick={() => setActiveTab('blueprints')} label="📐 Planos" />
            <TabButton active={activeTab === 'sim'} onClick={() => setActiveTab('sim')} label="🎬 Operación" />
            <TabButton active={activeTab === 'calculations'} onClick={() => setActiveTab('calculations')} label="🔢 Cálculos" />
            <TabButton active={activeTab === 'physics'} onClick={() => setActiveTab('physics')} label="⚛️ Física" />
            <TabButton active={activeTab === 'bom'} onClick={() => setActiveTab('bom')} label="📦 Materiales" />
            <TabButton active={activeTab === 'assembly'} onClick={() => setActiveTab('assembly')} label="🔧 Montaje" />
          </div>

          <div className="transition-all duration-300 min-h-[400px]">
            {activeTab === 'blueprints' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {blueprints.map((bp, idx) => (
                  <GeneratedImageDisplay key={idx} src={bp.url} alt={bp.view} label={bp.view} />
                ))}
              </div>
            )}
            {activeTab === 'sim' && <MechanismSimulation data={machineData} />}
            {activeTab === 'calculations' && <EngineeringCalculations data={machineData} onInfo={showHelp} />}
            {activeTab === 'physics' && <PhysicsAnalysis data={machineData} onInfo={showHelp} />}
            {activeTab === 'assembly' && <AssemblyGuide data={machineData} onInfo={showHelp} />}
            {activeTab === 'bom' && (
              <div className="space-y-8">
                <div className="glass-card overflow-hidden">
                  <div className="p-4 bg-[#1c2128] border-b border-[#30363d]">
                    <h3 className="archivo-black text-lg text-[#00d9ff] uppercase flex items-center gap-2">
                      <span>📦</span> Bill of Materials (BOM)
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#1c2128] text-[10px] text-[#00d9ff] uppercase font-bold tracking-widest border-b-2 border-[#30363d]">
                        <tr>
                          <th className="p-4">Item</th>
                          <th className="p-4">Cant.</th>
                          <th className="p-4">Especificaciones</th>
                          <th className="p-4">Norma</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#30363d]">
                        {(machineData.lista_materiales || []).map((m, i) => (
                          <tr key={i} className="hover:bg-[#00d9ff]/5 transition-colors">
                            <td className="p-4 text-white font-bold">{m.item}</td>
                            <td className="p-4 text-[#00d9ff] font-bold">{m.cantidad}</td>
                            <td className="p-4 text-xs text-[#8b949e]">{m.especificaciones}</td>
                            <td className="p-4 text-xs text-[#8b949e] font-mono">{m.norma || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <TechnicalSpecifications data={machineData} onInfo={showHelp} />
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="py-12 border-t border-[#30363d] text-center space-y-4">
        <p className="text-[#8b949e] text-[10px] uppercase tracking-widest">
          SISTEMA DE DISEÑO ASISTIDO POR IA - NIVEL INDUSTRIAL 4.0
        </p>
      </footer>

      <HelpModal 
        isOpen={helpConfig.isOpen} 
        title={helpConfig.title} 
        content={helpConfig.content} 
        onClose={() => setHelpConfig(prev => ({ ...prev, isOpen: false }))} 
      />
    </div>
  );
};

const TabButton: React.FC<{ active: boolean, onClick: () => void, label: string }> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`py-4 px-6 text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border-b-4 ${
      active ? 'border-[#00d9ff] text-[#00d9ff]' : 'border-transparent text-[#8b949e] hover:text-white'
    }`}
  >
    {label}
  </button>
);

export default App;
