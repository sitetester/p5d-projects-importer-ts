import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProjectThumbnail} from "./ProjectThumbnail";
import {ProjectStats} from "./ProjectStats";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column()
    hash: string;

    @Column()
    title: number;

    // https://typeorm.io/#/undefined/creating-a-one-to-one-relation
    @OneToOne(() => ProjectThumbnail)
    @JoinColumn()
    thumbnail: ProjectThumbnail;

    @OneToOne(() => ProjectStats)
    @JoinColumn()
    stats: ProjectStats;

    @Column()
    aboutContents: string;

    @Column()
    numFloors: number;

    @Column()
    numRooms: number;

    @Column()
    numOtherItems: number;

}
