import { Request, Response } from 'express';

class EquipoController {
    
    getTeam(req: Request, res: Response) {
        // Método placeholder - por ahora solo devolver respuesta vacía
        res.status(200).json({
            msg: 'Equipos endpoint - pendiente de implementar'
        });
    }

    createTeam(req: Request, res: Response) {
        // Método placeholder - por ahora solo devolver respuesta vacía
        res.status(200).json({
            msg: 'Crear equipos endpoint - pendiente de implementar'
        });
    }
}

const equipoControler = new EquipoController();
export default equipoControler;