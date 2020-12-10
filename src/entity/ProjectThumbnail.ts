import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProjectThumbnail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    src: string;

    @Column()
    alt: string;
}