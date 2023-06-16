

import {  Request, Response } from 'express';
import { where } from 'sequelize/types';

import { Venta, VentaI } from '../models/venta';
import { Cliente } from '../models/cliente';
import { Coche } from '../models/coche';

export class VentaController{
        //metdo mostrar ventas
    public async getAllVenta(req: Request, res:Response){
        try {
            const venta: VentaI[] = await Venta.findAll({
                include: [
                    {
                        model: Cliente,
                        as:'cliente',
                        attributes: ['nombre']
                    },
                    {
                        model: Coche,
                        attributes: ['modelo']
                    }
                ]
            }) // select * from clientes;
            res.status(200).json({venta})
        } catch (error) {

        }
    }
    public async getOneVenta(req: Request, res:Response){
        const { id: idParam } = req.params
        try {
            const venta:VentaI | any = await Venta.findByPk(
                idParam,
            //    { include: Cliente}
            )
            console.log(venta.toJSON());
            // const venta:VentaI | null = await Venta.findOne(
            //     {
            //         where: { 
            //             id: idParam,
            //         },
            //         include: Cliente
            //     }
            // )
            if (venta){
                res.status(200).json({venta})
            } else return  res.status(300).json({msg: "La venta no existe"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }
    public async createVenta(req: Request, res:Response){
        const {
            fechaVenta,
            subtotalVenta,
            impuestosVenta,
            descuentosVenta,
            totalVenta,
           clienteId,
           cocheId
        } = req.body;

        try {
            let body:VentaI = {
                fechaVenta,
                subtotalVenta,
                impuestosVenta,
                descuentosVenta,
                totalVenta,
                clienteId,
                cocheId
                
            } 

            const venta:VentaI = await Venta.create({...body});
            res.status(200).json({venta});

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }

    }
    public async updateVenta(req: Request, res:Response){
        const { id:pk } = req.params;
        const {
            id,
            fechaVenta,
            subtotalVenta,
            impuestosVenta,
            descuentosVenta,
            totalVenta,
           clienteId,
           cocheId
        } = req.body;

        try {
            let body:VentaI = {
                fechaVenta,
                subtotalVenta,
                impuestosVenta,
                descuentosVenta,
                totalVenta,
                clienteId,
                cocheId
            } 

            const ventaExist: VentaI | null = await Venta.findByPk(pk);
            if(!ventaExist) return res.status(500).json({msg:"La venta No existe"})
 

            await Venta.update(
                body,{
                    where: {id:pk}
                }
            );

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
        const venta: VentaI | null = await  Venta.findByPk(pk);
        if(venta) return res.status(200).json({venta})

    }

    public async deleteVenta(req: Request, res:Response){
        const { id:pk } = req.params;
        try {
            const ventaExist: VentaI | null = await Venta.findByPk(pk);
            if(!ventaExist) return res.status(500).json({msg:"La venta No existe"})
            await Venta.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"La venta se ha  Eliminado"})
        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }

    } 
}