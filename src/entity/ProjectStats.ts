import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Project} from "./Project";

@Entity()
export class ProjectStats {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numViews: number;

    @Column()
    numLikes: number;

    @Column()
    numComments: number;

    // https://typeorm.io/#/undefined/inverse-side-of-the-relationship
    // ```Note that we should use @JoinColumn decorator only on one side of a relation.```
    @OneToOne(type => Project, project => project.stats)
    project: Project;
}
