import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "title" })
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];
}
