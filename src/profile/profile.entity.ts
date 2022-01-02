import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ProfileEntity {
    @PrimaryColumn()
    owneremail: string;
} 