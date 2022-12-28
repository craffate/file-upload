import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    fieldname: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    path: string;

    @Column({
        type: "varchar",
        default: "application/octet-stream",
        nullable: false
    })
    mimetype: string;
}