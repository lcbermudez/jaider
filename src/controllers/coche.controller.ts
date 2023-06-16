import {  Request, Response } from 'express';
import { where } from 'sequelize/types';

import { Venta } from '../models/venta';
import { Cliente } from '../models/cliente';
import { Coche,CocheI } from '../models/coche';
export class CocheController{
        //metdo mostrar 
    public async getAllCoche(req: Request, res:Response){
        try {
            const coche: CocheI[] = await Coche.findAll() // select * from clientes;
            res.status(200).json({coche})
        } catch (error) {

        }
    }
    public async getOneCoche(req: Request, res:Response){
        const { id: idParam } = req.params
        try {
            const coche:CocheI | null = await Coche.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (coche){
                res.status(200).json({coche})
            } else return  res.status(300).json({msg: "El} coche no existe"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }
    public async createCoche(req: Request, res:Response){
        const {
            codigo,
            modelo,
            color,
            pvc,
        } = req.body;

        try {
            let body:CocheI = {
            codigo,
            modelo,
            color,
            pvc
            } 
            console.log( body)

            const coche:CocheI = await Coche.create({...body});
            res.status(200).json({coche});

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }

    }
    public async updateCoche(req: Request, res:Response){
        const { id:pk } = req.params;
        const {
            codigo,
            modelo,
            color,
             pvc,
           // clienteId
        } = req.body;

        try {
            let body:CocheI = {
                codigo,
                modelo,
                color,
                pvc,
                // clienteId
            } 

            const cocheExist: CocheI | null = await Coche.findByPk(pk);
            if(!cocheExist) return res.status(500).json({msg:"La venta No existe"})
            await Coche.update(
                body,{
                    where: {id:pk}
                }
            );

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
        const coche: CocheI | null = await  Coche.findByPk(pk);
        if(coche) return res.status(200).json({coche})

    }
    public async deleteCoche(req: Request, res:Response){
        const { id:pk } = req.params;
        console.log( pk)
        try {
            const cocheExist:CocheI| null = await Coche.findByPk(pk);
            if(!cocheExist) return res.status(500).json({msg:"El coche No existe"})
            await Coche.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Coche Eliminado"})
        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }

    } 
}