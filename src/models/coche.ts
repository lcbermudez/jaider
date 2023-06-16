import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Coche extends Model{
    public codigo!: string;
    public modelo!: string;
    public color!: string;
    public pvc!: string;
    
}

export interface CocheI{
    codigo:string;
    modelo:string;
    color:string;
    pvc:string;
}

Coche.init(
    {
        codigo:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        modelo:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        color:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        pvc:{
            type: DataTypes.INTEGER,
            allowNull: false 
        },
       
        
    },
    {
        tableName: "coches",
        sequelize: database,
        timestamps: true
    }

);

