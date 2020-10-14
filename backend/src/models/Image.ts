import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Orphanage from "./Orphanage";

@Entity('images')
class Images {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @Column()
    orphanage_id: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({ name: 'orphanage_id'})
    orphanage: Orphanage;

}

export default Images;