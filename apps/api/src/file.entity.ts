import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column({
        type: "text",
        length: 64,
        nullable: false
    })
    filename: string;

    @Column({
        type: "text",
        length: 255,
        nullable: false
    })
    path: string;

    @Column({
        type: "text",
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