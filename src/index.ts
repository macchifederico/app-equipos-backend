import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './database' 

//Routes
import dataRoutes from './routes/DataRoutes';
import equiposRoutes from './routes/EquiposRoutes';
import jugadoresRoutes from './routes/JugadoresRoutes';

//Importo modelos para bbdd
import './models/Equipo';
import './models/Jugador';

require('dotenv').config();

class Server {
    
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        
    }

    routes(): void{
        this.app.use('/api', dataRoutes);
        this.app.use('/api/equipos', equiposRoutes);
        this.app.use('/api/jugadores', jugadoresRoutes);
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
