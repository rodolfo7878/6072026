
export interface SUPPORTED_LANGUAGE {
  code: string;
  name: string;
  label: string;
}

export const SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGE[] = [
  { code: 'es', name: 'Spanish', label: 'Español' },
  { code: 'en', name: 'English', label: 'English' },
  { code: 'fr', name: 'French', label: 'Français' },
  { code: 'de', name: 'German', label: 'Deutsch' },
  { code: 'it', name: 'Italian', label: 'Italiano' },
  { code: 'pt', name: 'Portuguese', label: 'Português' },
];

export interface GroundingSource {
  title: string;
  url: string;
}

export interface VariableCalculation {
  simbolo: string;
  descripcion: string;
  valor: string;
}

export interface EngineeringCalculation {
  nombre: string;
  tipo: string;
  descripcion?: string;
  formula?: string;
  variables?: VariableCalculation[];
  resultado: string;
  unidad?: string;
  interpretacion?: string;
  factor_seguridad?: string;
}

export interface ComponenteAnimado {
  nombre: string;
  tipo_movimiento: 'rotativo' | 'lineal' | 'oscilante';
  eje: 'x' | 'y' | 'z';
  rango: string;
  velocidad_nominal: string;
}

export interface SimulacionData {
  tipo_mecanismo: string;
  descripcion_secuencia: string;
  frecuencia_hz: number;
  componentes_activos: ComponenteAnimado[];
}

export interface FuerzaComponentes {
  x?: string;
  y?: string;
  z?: string;
}

export interface Fuerza {
  nombre: string;
  tipo: string;
  magnitud: string;
  direccion?: string;
  punto_aplicacion?: string;
  componentes?: FuerzaComponentes;
}

export interface Equilibrio {
  suma_fuerzas_x?: string;
  suma_fuerzas_y?: string;
  suma_fuerzas_z?: string;
  suma_momentos?: string;
}

export interface Perdida {
  tipo: string;
  cantidad: string;
}

export interface AnalisisEnergia {
  entrada?: string;
  salida?: string;
  fuente?: string;
  forma?: string;
  perdidas?: Perdida[];
  eficiencia?: string;
}

export interface Cinematica {
  velocidad?: string;
  velocidad_angular?: string;
  aceleracion?: string;
  aceleracion_angular?: string;
  desplazamiento?: string;
  trayectoria?: string;
}

export interface AnalisisFisico {
  diagrama_cuerpo_libre?: string;
  fuerzas?: Fuerza[];
  equilibrio?: Equilibrio;
  energia?: AnalisisEnergia;
  cinematica?: Cinematica;
}

export interface MaterialItem {
  item: string;
  cantidad: string;
  especificaciones: string;
  norma?: string;
}

export interface FunctionalMachineData {
  nombre: string;
  objetivo_funcional: string;
  componentes_mecanicos_clave: string[];
  vistas_necesarias: string[];
  lista_materiales: MaterialItem[];
  consideraciones_seguridad: string;
  calculos_ingenieria?: EngineeringCalculation[];
  analisis_fisico?: AnalisisFisico;
  simulacion?: SimulacionData;
  especificaciones_tecnicas?: Record<string, string>;
  normas_aplicables?: string[];
  guia_ensamblaje?: { paso: number; descripcion: string }[];
  dimensiones?: { largo?: string; ancho?: string; alto?: string; tolerancias?: string };
}

export interface GenerateMachineResponse {
  data: FunctionalMachineData;
  sources: GroundingSource[];
}
