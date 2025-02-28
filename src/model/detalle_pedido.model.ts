import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { productoModel } from "./producto.model";
import { pedidoModel } from "./pedido.model";


@Entity({ name: "detalle_pedido" })
export class detalle_pedidoModel {

    @PrimaryGeneratedColumn()
    id_detalle: number;

    @ManyToOne(() => pedidoModel, pedido => pedido.detalles)
    @JoinColumn({ name: "id_pedido" }) // Especificamos el nombre de la columna de la clave foránea
    id_pedido: pedidoModel;

    @ManyToOne(() => productoModel)
    @JoinColumn({ name: "id_producto" })
    id_producto: productoModel;

    @Column()
    cantidad: number;

    @Column("decimal", { precision: 10, scale: 2 })
    subtotal: number;
}