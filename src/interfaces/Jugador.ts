export interface IJugador {
    id?: number;
    id_usuario: number;
    id_equipo?: number | null;
    nombre: string;
    apodo: string;
    posicion_1: string;
    posicion_2?: string;
    img_url?: string;
    tiro: number;
    remate: number;
    defensa: number;
    velocidad: number;
    gambeta: number;
    estado_fisico: number;
    tecnica: number;
    rusticidad: number;
    temperamento: number;
    prop_lesiones: number;
    promedioHabilidades?: number;
}

export interface IJugadorInput {
    id_usuario: number;
    nombre: string;
    apodo: string;
    posicion_1: string;
    posicion_2?: string;
    img_url?: string;
    habilidades: {
        tiro: number;
        remate: number;
        defensa: number;
        velocidad: number;
        gambeta: number;
        estado_fisico: number;
        tecnica: number;
        rusticidad: number;
        temperamento: number;
        prop_lesiones: number;
    };
    promedioHabilidades?: number;
}

export interface ITeamUpdate {
    teamOne: IJugador[];
    teamTwo: IJugador[];
}

export interface IServiceResponse<T = any> {
    status?: boolean;
    error?: string;
    data?: T;
    players?: T;
    teams?: T;
}