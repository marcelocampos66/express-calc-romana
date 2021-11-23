import 'dotenv/config';
import App from './App';
import controllers from '../controllers';

const PORT = process.env.PORT || 8080;

const server = new App(Number(PORT), controllers);

server.startServer()
