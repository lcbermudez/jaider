import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Cliente extends Model{
    public cedula!: string;
    public nombre!: string;
    public apellido!: string;
    public direccion!: string;
    public ciudad!: string;
    public codigoCliente!: number;
}

export interface ClienteI{
    cedula: string;
    nombre: string;
    apellido: string;
    direccion: string;
    ciudad: string;
    codigoCliente: number;
}

Cliente.init(
    {
        cedula:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        direccion:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        ciudad:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        codigoCliente:{
            type: DataTypes.INTEGER,
            allowNull: false 
        },
    },
    {
        tableName: "clientes",
        sequelize: database,
        timestamps: true
    }

);