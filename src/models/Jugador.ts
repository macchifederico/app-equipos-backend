import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

export const Jugador = sequelize.define('jugadores', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario:{
        type: DataTypes.INTEGER
    },
    id_equipo:{
        type: DataTypes.INTEGER
    },
    nombre:{
        type: DataTypes.STRING
    },
    apodo:{
        type: DataTypes.STRING
    },
    posicion_1:{
        type: DataTypes.STRING
    },
    posicion_2:{
        type: DataTypes.STRING
    },
    img_url:{
        type: DataTypes.STRING
    },
    tiro:{
        type: DataTypes.INTEGER
    },
    remate:{
        type: DataTypes.INTEGER
    },
    defensa:{
        type: DataTypes.INTEGER
    },
    velocidad:{
        type: DataTypes.INTEGER
    },
    gambeta:{
        type: DataTypes.INTEGER
    },
    estado_fisico:{
        type: DataTypes.INTEGER
    },
    tecnica:{
        type: DataTypes.INTEGER
    },
    rusticidad:{
        type: DataTypes.INTEGER
    },
    temperamento:{
        type: DataTypes.INTEGER
    },
    prop_lesiones:{
        type: DataTypes.INTEGER
    },
    promedioHabilidades:{
        type: DataTypes.FLOAT
    }

})