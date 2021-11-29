import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    protPass: string;

    @Column()
    utcPass: string;

    @Column()
    passUsed: boolean;
} 