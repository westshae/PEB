import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PostsEntity {
    @PrimaryColumn()
    ownerEmail: string;

    @Column()
    postID: string;

    @Column()
    content: string;

    @Column()
    likes: number;

    @Column()
    dislikes: number;

    @Column("text", {array: true, nullable:true})
    comments: string[];
} 