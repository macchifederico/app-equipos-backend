import { Router } from "express";
import jugadorController from "../controllers/JugadorController";

class JugadoresRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', jugadorController.getPlayers);
        this.router.post('/teams', jugadorController.getTeams);
        this.router.post('/create', jugadorController.createPlayer);
        this.router.post('/update', jugadorController.updatePlayersByEquipoId);
    }
    
}

const jugadoresRoutes = new JugadoresRoutes();
export default jugadoresRoutes.router;