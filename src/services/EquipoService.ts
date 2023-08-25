import { Equipo } from "../models/Equipo";

class EquipoService {
    
    async getEquipos(id_persona: string) {
        const equipos = await Equipo.findAll({
            where: {
                id_persona: id_persona
            }
        });
        return {
            equipos: equipos,
            status: true
        }
    
    }

    async createEquipo() {
    }
}

const equipoService = new EquipoService();
export default equipoService;