import { Router } from "express";
import equipoControler from "../controllers/EquipoController";

class EquiposRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', equipoControler.getTeam);
        this.router.post('/', equipoControler.createTeam);
    
    }
}

const equiposRoutes = new EquiposRoutes();
export default equiposRoutes.router;