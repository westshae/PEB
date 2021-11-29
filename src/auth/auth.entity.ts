import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @Column()
    email: string;

    @Column()
    protPass: string;

    @Column()
    utcPass: string;

    @Column()
    passUsed: boolean;
} 