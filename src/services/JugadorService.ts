import { where } from "sequelize";
import { Jugador } from "../models/Jugador";
import { IJugador, IJugadorInput, IServiceResponse } from "../interfaces/Jugador";


class JugadorService {

    async getPlayers(userId: number): Promise<IServiceResponse> {         
        try {
            const players = await Jugador.findAll({
                where: {
                    id_usuario: userId            
                }
            });
            await this.cleanTeams(players, userId);                  
            return {"players": players};
        } catch (error) {
            console.error('Error getting players:', error);
            return {
                error: 'Failed to retrieve players',
                status: false
            };
        }
    }
    
    async createPlayer(jugador: IJugadorInput): Promise<IServiceResponse> {
        let promedioHabilidades = 0
        const habilidadValues: number[] = Object.values(jugador.habilidades);
        const sumaTotal = habilidadValues.reduce((acc : number, val : number) => acc + val, 0);        
        const promedio = sumaTotal / habilidadValues.length;
       
        if (promedio < 1){
            promedioHabilidades = jugador.promedioHabilidades = 1;
        
        }else{
            promedioHabilidades = jugador.promedioHabilidades = Math.round(promedio);      
        }

        try {
            await Jugador.create({
                id_usuario: jugador.id_usuario,
                id_equipo: null,
                nombre: jugador.nombre,
                apodo: jugador.apodo,
                posicion_1: jugador.posicion_1,
                posicion_2: jugador.posicion_2,
                img_url: jugador.img_url,
                tiro: jugador.habilidades.tiro,
                remate: jugador.habilidades.remate,
                defensa: jugador.habilidades.defensa,
                velocidad: jugador.habilidades.velocidad,
                gambeta: jugador.habilidades.gambeta,
                estado_fisico: jugador.habilidades.estado_fisico,
                tecnica: jugador.habilidades.tecnica,
                rusticidad: jugador.habilidades.rusticidad,
                temperamento: jugador.habilidades.temperamento,
                prop_lesiones: jugador.habilidades.prop_lesiones,
                promedioHabilidades: promedioHabilidades 
            });
            return {
                status: true
            }
        } catch (error) {
            return {
                error: error,
                status: false
            }
        }
        
    }

    async updatePlayersByEquipoId(teamOne: IJugador[], teamTwo: IJugador[]): Promise<void> {
        try {
            // Actualizar equipo 1
            const teamOneUpdates = teamOne.map(player => 
                Jugador.update({
                    id_equipo: 1
                }, {
                    where: {
                        id: player.id,
                        id_usuario: player.id_usuario
                    }
                })
            );

            // Actualizar equipo 2
            const teamTwoUpdates = teamTwo.map(player => 
                Jugador.update({
                    id_equipo: 2
                }, {
                    where: {
                        id: player.id,
                        id_usuario: player.id_usuario
                    }
                })
            );

            // Esperar a que todas las actualizaciones se completen
            await Promise.all([...teamOneUpdates, ...teamTwoUpdates]);
        } catch (error) {
            console.error('Error updating players by team ID:', error);
            throw new Error('Failed to update teams');
        }
    }

    async getTeams(userId: number): Promise<IServiceResponse> {
        try {
            const teamOne = await Jugador.findAll({
                where: {
                    id_usuario: userId,
                    id_equipo: 1
                }
            })
            const teamTwo = await Jugador.findAll({
                where: {
                    id_usuario: userId,
                    id_equipo: 2
                }
            })
            let teams = {teamOne, teamTwo}
            return {
                teams: teams
            }
            
        } catch (error) {
            return {
                error: error,
            }
        }
    }

    async cleanTeams(players: IJugador[], userId: number): Promise<void> {
        try {
            const cleanUpdates = players.map(player => 
                Jugador.update({
                    id_equipo: null
                }, {
                    where: {
                        id: player.id,
                        id_usuario: userId
                    }
                })
            );
            
            await Promise.all(cleanUpdates);
        } catch (error) {
            console.error('Error cleaning teams:', error);
            throw new Error('Failed to clean teams');
        }
    }

    async deletePlayer(id_jugador: number, id_usuario: number): Promise<IServiceResponse> {
        try{
            await Jugador.destroy({
                where: {
                    id: id_jugador,
                    id_usuario: id_usuario
                }
            })
            return {
                status: "OK",
            }
        }catch (error){
            return {
                error: "Error al eliminar el jugador"
            }
        } 
    }
}

const jugadorService = new JugadorService();
export default jugadorService;