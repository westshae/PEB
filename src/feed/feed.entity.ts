import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class FeedEntity {
  @PrimaryColumn()
  feedID: string;

  @Column("text", { array: true, nullable: true })
  postID: string[];
}
