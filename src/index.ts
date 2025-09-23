import express, {Application, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './database';
import keys from './keys';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { apiLimiter, devLimiter } from './middleware/rateLimiter';

//Routes
import jugadoresRoutes from './routes/JugadoresRoutes';

//Importo modelos para bbdd
import './models/Equipo';
import './models/Jugador';

class Server {
    
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', keys.port);

        // Rate limiting - aplicar antes de otros middlewares
        if (keys.nodeEnv === 'production') {
            this.app.use('/api', apiLimiter);
            console.log('✓ Production rate limiting enabled');
        } else {
            this.app.use('/api', devLimiter);
            console.log('✓ Development rate limiting enabled (permissive)');
        }

        this.app.use(morgan('dev'));
        this.app.use(cors({
            origin: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:4200',
            credentials: true
        }));
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({extended: true, limit: '10mb'}));
        
    }

    routes(): void{
        this.app.use('/api/jugadores', jugadoresRoutes);
        
        // 404 handler
        this.app.use(notFoundHandler);
        
        // Error handler (debe ir al final)
        this.app.use(errorHandler);
    }

    start(): void{
        this.app.listen(this.app.get('port'), ()=> {
            console.log('Servidor corriendo en', this.app.get('port'));
        })
    }

    async startDB(){
        try {
            await sequelize.sync({force: false, alter: false});
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }
    
}

const server = new Server();
server.startDB();
server.start();
