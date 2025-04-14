import App from './app';
import myController from './controller/controller';
import { AuthRoutes } from 'routes/auth.routes';

new App([new AuthRoutes()]);
