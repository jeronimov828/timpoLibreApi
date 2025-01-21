import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "productos"})
export class productoModel {
    @PrimaryGeneratedColumn()
    id_producto: number;

    @Column()
    nombre_producto: string;

    @Column()
    precio: number;

    @Column()
    cantidad: number;

    @Column()
    fecha_ingreso: Date;
}