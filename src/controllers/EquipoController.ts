import { Request, Response } from 'express';
import equipoService from '../services/EquipoService';

class EquipoController {
    
    getTeam(req: Request, res: Response) {
        const {id_persona} = req.body;

        equipoService.getEquipos(id_persona)
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

    createTeam(req: Request, res: Response) {
        equipoService.createEquipo();
        res.status(200).json({msg: 'crear equipos!'});
    }

    

}

const equipoControler = new EquipoController();
export default equipoControler;