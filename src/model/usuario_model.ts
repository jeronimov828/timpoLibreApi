import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "usuarios" })
export class usuarioModel {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column({ unique: true, nullable: false })
    usuario: string;

    @Column({ unique: true, nullable: false })
    contrasena: string;

    @Column({nullable: false })
    rol: string;
}