import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column({})
  name!: string;

  @Column({ unique: true })
  nickname!: string;

  @Column()
  age!: number;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deledtedAt!: Date | null;

  @OneToMany(() => Post, (posts) => posts.user)
  posts!: Post[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments!: Comment[];
}
