import { Request, Response, Application, Router } from "express";

import { VentaController } from "../controllers/venta.controller";

export class VentaRoutes{
    public ventaController: VentaController =  new VentaController();

    public routes(app: Application): void {
        app.route("/ventas").get(this.ventaController.getAllVenta)
        app.route("/venta/:id").get(this.ventaController.getOneVenta)
        app.route("/venta").post(this.ventaController.createVenta)
        app.route("/venta/:id").put(this.ventaController.updateVenta)
        app.route("/venta/:id").delete(this.ventaController.deleteVenta)
    }
}