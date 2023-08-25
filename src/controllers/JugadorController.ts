import { Request, Response } from 'express';
import jugadorService from '../services/JugadorService';

class JugadorController {

    getPlayers(req: Request, res: Response) {

        jugadorService.getPlayers()
            .then(data => {
                res.status(200).json({
                    players: data.players
                });
            })
            .catch(err => {
                res.status(500).json({
                    err
                });
            })
        
    
    }
    
    createPlayer(req: Request, res: Response) {
        const {jugador} = req.body;
        
        jugadorService.createPlayer(jugador)
            .then(data => {
                res.status(200).json({
                    "data": data
                });
            })
            .catch(err => {
                res.status(500).json({
                    "error": err
                });
            })
    }
}

const jugadorController = new JugadorController();
export default jugadorController;