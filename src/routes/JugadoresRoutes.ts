import { Router } from "express";
import jugadorController from "../controllers/JugadorController";

class JugadoresRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', jugadorController.getPlayers);
        this.router.post('/', jugadorController.createPlayer);
    }
}

const jugadoresRoutes = new JugadoresRoutes();
export default jugadoresRoutes.router;