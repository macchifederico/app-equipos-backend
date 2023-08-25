import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

export const Equipo = sequelize.define('equipos', {

    id_equipo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario:{
        type: DataTypes.INTEGER
    },
    equipo_1:{
        type: DataTypes.STRING
    },
    equipo_2:{
        type: DataTypes.STRING
    }
})