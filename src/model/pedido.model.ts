import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { detalle_pedidoModel } from "./detalle_pedido.model";

@Entity({ name: "pedidos" })
export class pedidoModel {

    @PrimaryGeneratedColumn()
    id_pedido: number;

    @Column("date")
    fecha: string;

    @Column()
    cantidad_pedida: number; // Cantidad del producto en este pedido

    @OneToMany(() => detalle_pedidoModel, detalle => detalle.id_pedido)
    detalles: detalle_pedidoModel[];

}