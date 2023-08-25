import { Sequelize } from "sequelize";
import keys from './keys';

const sequelize = new Sequelize(
    keys.database.database, 
    keys.database.user, 
    keys.database.password, 
    {
        host: keys.database.host,
        dialect: 'mysql'
    }
)

export default sequelize;

