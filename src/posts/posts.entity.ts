import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PostsEntity {
    @PrimaryColumn()
    email: string;

    @Column({nullable:true})
    protPass: string;

    @Column({nullable:true})
    utcPass: string;

    @Column({nullable:true})
    passUsed: boolean;

    @Column({nullable:true})
    profession: string;

    @Column({nullable:true})
    country: string;

    @Column({nullable:true})
    city: string;

    @Column()
    balance: number;

    @Column()
    ratings:number;

    @Column()
    ratingTotal:number;
} 