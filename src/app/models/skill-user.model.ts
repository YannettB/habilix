export interface Usuario {
    nombre: string;
    conocimientos: Conocimiento[];
}

export interface Conocimiento {
    tec_id: string;
    puntuacion: number;
}
  