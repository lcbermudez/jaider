import { Request, Response, Application, Router } from "express";

import { CocheController } from "../controllers/coche.controller";

export class CocheRoutes  {
    public cocheController: CocheController =  new CocheController();


    public routes(app: Application): void {
        app.route("/coches").get(this.cocheController.getAllCoche)
        app.route("/coche/:id").get(this.cocheController.getOneCoche)
        app.route("/coche").post(this.cocheController.createCoche)
        app.route("/coche/:id").put(this.cocheController.updateCoche)
        app.route("/coches/:id").delete(this.cocheController.deleteCoche)
    }
}