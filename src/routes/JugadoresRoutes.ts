import { Router } from "express";
import jugadorController from "../controllers/JugadorController";
import { validateUserId, validatePlayerCreation, validatePlayerDeletion, validateTeamUpdate } from "../middleware/validation";
import { createPlayerLimiter, deletePlayerLimiter, updateTeamsLimiter, queryLimiter } from "../middleware/rateLimiter";

class JugadoresRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        // Rutas de consulta (más permisivas)
        this.router.post('/', queryLimiter, validateUserId, jugadorController.getPlayers);
        this.router.post('/teams', queryLimiter, validateUserId, jugadorController.getTeams);
        
        // Rutas de escritura (más restrictivas)
        this.router.post('/create', createPlayerLimiter, validatePlayerCreation, jugadorController.createPlayer);
        this.router.post('/update', updateTeamsLimiter, validateTeamUpdate, jugadorController.updatePlayersByEquipoId);
        this.router.post('/delete', deletePlayerLimiter, validatePlayerDeletion, jugadorController.deletePlayer);
    }
    
}

const jugadoresRoutes = new JugadoresRoutes();
export default jugadoresRoutes.router;