import { ItemRoutes } from './routes/item.routes';
import App from './app';
import { AuthRoutes } from './routes/auth.routes';

new App([
    new AuthRoutes(),
    new ItemRoutes()
]);

