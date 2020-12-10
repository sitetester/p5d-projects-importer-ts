import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

}
