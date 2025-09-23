import dotenv from 'dotenv';

dotenv.config();

export default {
    database: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'app_equipos'
    },
    jwtSecret: process.env.JWT_SECRET || 'default_secret_change_this',
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
}