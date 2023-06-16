import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Cliente } from "./cliente";
import { Coche } from "./coche";

export class Venta extends Model {
    public fechaVenta!: string;
    public subtotalVenta!: number;
    public impuestosVenta!: number;
    public descuentosVenta!: number;
    public totalVenta!: number;
    public clienteId!:number;
}

export interface VentaI{
    fechaVenta: string;
    subtotalVenta: number;
    impuestosVenta: number;
    descuentosVenta: number;
    totalVenta: number;
    clienteId:number;
}

Venta.init(
    {
        fechaVenta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtotalVenta: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        impuestosVenta: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        descuentosVenta: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        totalVenta: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cliente,
                key: 'id',
            }
        },
        cocheId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Coche,
                key: 'id',
            }
        }
    },
    {
        tableName: "ventas",
        sequelize: database,
        timestamps: true 
    }
);

// Asociación la tabla cliente con la tabla venta
Venta.belongsTo(Cliente, { foreignKey: "clienteId", as: 'cliente'}); // Agrega una columna clienteId en la tabla ventas
// agregamos la relacion inversa de uno a muchos
Cliente.hasMany(Venta, { foreignKey: "clienteId" }); // Agrega una columna clienteId en la tabla ventas
// Asociación la tabla cliente con la tabla venta

Venta.belongsTo(Coche, { foreignKey: "cocheId", as: 'coche'});
Coche.hasMany(Venta, { foreignKey: "cocheId" });

