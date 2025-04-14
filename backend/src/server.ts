import { ItemRoutes } from './routes/item.routes';
import App from './app';
import { AuthRoutes } from './routes/auth.routes';
import { CategoryRoutes } from './routes/category.routes';
import { OrderRoutes } from './routes/order.routes';

new App([
    new AuthRoutes(),
    new ItemRoutes(),
    new CategoryRoutes(),
    new OrderRoutes()
]);
