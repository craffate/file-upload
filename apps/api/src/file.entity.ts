import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column({
        type: "char",
        length: 64,
        nullable: false
    })
    filename: string;

    @Column({
        type: "char",
        length: 255,
        nullable: false
    })
    path: string;

    @Column({
        type: "char",
        length: 32,
        default: "application/octet-stream",
        nullable: false
    })
    mimetype: string;

    @Column({
        type: "integer",
        unsigned: true,
        nullable: false
    })
    size: number;
}