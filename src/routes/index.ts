import { ClienteRoutes } from './cliente';
import { VentaRoutes } from './venta';
import{ CocheRoutes}from './coche';

export class Routes {
    public clienteRoutes: ClienteRoutes = new ClienteRoutes();
    public ventaRoutes: VentaRoutes = new VentaRoutes();
    public cocheRoutes: CocheRoutes= new CocheRoutes();
}