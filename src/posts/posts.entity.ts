import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PostsEntity {
  @PrimaryColumn()
  postID: string;
  
  @Column()
  ownerEmail: string;

  @Column()
  content: string;

  @Column()
  likes: number;

  @Column("text", { array: true, nullable: true })
  likerEmail: string[];

  @Column()
  dislikes: number;

  @Column("text", { array: true, nullable: true })
  dislikerEmail: string[];

  @Column({ nullable: true })
  replyID: string;
}
