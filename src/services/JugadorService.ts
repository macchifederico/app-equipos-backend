import { Jugador } from "../models/Jugador";


class JugadorService {

    async getPlayers(){ 
    try {
        const players = await Jugador.findAll();
        return {
            players: players,
            status: true
        }
    } catch (error) {
        return {
            status: false,
        }
    }
    }
    
    async createPlayer(jugador: any){
        try {
            await Jugador.create({
                id_usuario: jugador.id_usuario,
                id_equipo: null,
                nombre: jugador.nombre,
                apodo: jugador.apodo,
                edad: jugador.edad,
                posicion_1: jugador.posicion_1,
                posicion_2: jugador.posicion_2,
                img_url: jugador.img_url,
                tiro: jugador.tiro,
                remate: jugador.remate,
                defensa: jugador.defensa,
                velocidad: jugador.velocidad,
                gambeta: jugador.gambeta,
                estado_fisico: jugador.estado_fisico,
                tecnica: jugador.tecnica,
                rusticidad: jugador.rusticidad,
                temperamento: jugador.temperamento,
                prop_lesiones: jugador.prop_lesiones,
                promedioHabilidades: jugador.promedioHabilidades 
            });
            return {
                status: true
            }
        } catch (error) {
            return {
                error: error,
                status: true
            }
        }
        
    }
}

const jugadorService = new JugadorService();
export default jugadorService;