import { Router } from "express";

class DataRoutes{
    public router: Router = Router();

    constructor(){

    }

    config(): void{

    }
}

const dataRoutes = new DataRoutes();
export default dataRoutes.router;