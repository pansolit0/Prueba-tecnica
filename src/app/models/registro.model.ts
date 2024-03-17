export interface Registro {
  id?: number;
  nombre: string;
  apodo?:string;
  fechaAtrapado?: Date;
  descripcion?: string;
  cantidad?: number;
  esLegendario: boolean;
  rareza?: number;
}
