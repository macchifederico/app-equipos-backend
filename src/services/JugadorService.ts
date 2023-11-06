import { where } from "sequelize";
import { Jugador } from "../models/Jugador";


class JugadorService {

    async getPlayers(userId: number){         
        const players = await Jugador.findAll({
            where: {
                id_usuario: userId            
            }
        });
        this.cleanTeams(players, userId)                  
        return {"players": players}
    }
    
    async createPlayer(jugador: any){
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

    async updatePlayersByEquipoId(teamOne: any, teamTwo: any){
        teamOne.forEach(async (player: any) => {
            await Jugador.update({
                id_equipo: 1
            },{
                where: {
                    id: player.id,
                    id_usuario: player.id_usuario
                }
            })
        })

        teamTwo.forEach(async (player: any) => {
            await Jugador.update({
                id_equipo: 2
            },{
                where: {
                    id: player.id,
                    id_usuario: player.id_usuario
                }
            })
        })
    }

    async getTeams(userId: number){
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

    async cleanTeams(players: any, userId: number){
        players.forEach(async (player: any) => {
                await Jugador.update({
                    id_equipo: null
                },{
                    where: {
                        id: player.id,
                        id_usuario: userId
                    }
                })
            })
        
        }
}

const jugadorService = new JugadorService();
export default jugadorService;