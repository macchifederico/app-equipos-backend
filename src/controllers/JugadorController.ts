import { Request, Response } from 'express';
import jugadorService from '../services/JugadorService';
import { Jugador } from '../models/Jugador';

class JugadorController {

    public async getPlayers(req: Request, res: Response) {       
        const {id_usuario} = req.body;
        
        jugadorService.getPlayers(id_usuario)
        .then(data => {
            res.status(200).json({
                "players": data.players
            })
        })
        .catch(err => {
            res.status(500).json({
                "error": err
            }).status(200);
        })
    }
    
    createPlayer(req: Request, res: Response) {
        const {jugador} = req.body;        
        
        jugadorService.createPlayer(jugador) 
            .then(data => {
                res.json({
                    "data": data
                }).status(200);
            })
            .catch(err => {
                res.status(500).json({
                    "error": err
                }).status(200);
            })
    }

    updatePlayersByEquipoId(req: Request, res: Response) {
        
        const {teamOne, teamTwo} = req.body;
        jugadorService.updatePlayersByEquipoId(teamOne, teamTwo)
            .then()
    }

    getTeams(req: Request, res: Response) {
        const {id_usuario} = req.body;
        
        jugadorService.getTeams(id_usuario)
            .then((data: any) => {                                
                res.status(200).json({
                   teams: data.teams
                })
            })
            .catch(err => {
                res.status(500).json({
                    err: err
                });
            })
    }

    desvincularJugadores(req: Request, res: Response) {
        console.log(req);
        
    }
}

const jugadorController = new JugadorController();
export default jugadorController;