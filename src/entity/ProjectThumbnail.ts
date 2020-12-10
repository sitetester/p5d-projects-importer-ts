import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Project} from "./Project";

@Entity()
export class ProjectThumbnail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    src: string;

    @Column()
    alt: string;

    // https://typeorm.io/#/undefined/inverse-side-of-the-relationship
    // ```Note that we should use @JoinColumn decorator only on one side of a relation.```
    @OneToOne(type => Project, project => project.thumbnail)
    project: Project;
}