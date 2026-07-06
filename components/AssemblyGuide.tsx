
import React from 'react';
import { FunctionalMachineData } from '../types';

interface AssemblyGuideProps {
  data: FunctionalMachineData;
  onInfo: (title: string, content: string) => void;
}

const AssemblyGuide: React.FC<AssemblyGuideProps> = ({ data, onInfo }) => {
  const steps = data.guia_ensamblaje || [];

  return (
    <div className="space-y-6">
      <div className="glassmorphism-card p-6 border-l-4 border-emerald-500">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-emerald-400">Guía de Ensamblaje y Montaje</h3>
            <p className="text-sm text-slate-400">
              Procedimientos técnicos para la construcción e integración del sistema mecánico
            </p>
          </div>
          <button
            onClick={() => onInfo(
              "Procedimientos de Montaje",
              "Siga estrictamente las normas de seguridad industrial. Se recomienda el uso de herramientas calibradas y torqueadores para conexiones críticas."
            )}
            className="text-slate-500 hover:text-emerald-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.length > 0 ? steps.map((step, idx) => (
          <div key={idx} className="glassmorphism-card p-5 hover:border-emerald-500/50 transition-all flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500 flex items-center justify-center font-bold text-emerald-400 shrink-0">
              {step.paso || idx + 1}
            </div>
            <div>
              <p className="text-slate-200 text-sm leading-relaxed">{step.descripcion}</p>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-slate-500">
            No se generó una guía paso a paso para este diseño.
          </div>
        )}
      </div>

      <div className="glassmorphism-card p-6 bg-slate-900/40">
        <h4 className="text-sm font-bold text-amber-500 uppercase mb-4 flex items-center gap-2">
          <span>⚠️</span> Checklist de Pre-Operación
        </h4>
        <ul className="space-y-2 text-xs text-slate-400">
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
            Verificación de torque en pernos estructurales
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
            Lubricación de superficies de contacto y rodamientos
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
            Alineación láser de ejes y poleas
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
            Prueba de carga estática al 125% de la nominal
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AssemblyGuide;
