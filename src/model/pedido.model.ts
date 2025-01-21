import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { productoModel } from "./producto.model";

@Entity({ name: "pedidos" })
export class pedidoModel {

    @PrimaryGeneratedColumn()
    id_pedido: number;

    @Column("date")
    fecha: string;

    @Column("decimal", { precision: 10, scale: 2 })
    total: number; // Total del pedido

    @Column()
    cantidad_pedida: number; // Cantidad del producto en este pedido

    @ManyToOne(() => productoModel)  // Relación con Producto
    @JoinColumn({ name: 'id_producto' })  // Asegúrate de definir la relación correctamente
    producto: productoModel;

}