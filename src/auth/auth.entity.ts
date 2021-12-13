import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @PrimaryColumn()
    email: string;

    @Column()
    id: number;

    @Column()
    protPass: string;

    @Column()
    utcPass: string;

    @Column()
    passUsed: boolean;
    
    @Column({nullable:true})
    accessToken: string;
} 