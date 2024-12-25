import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Article } from "../../article/entities/article.entity";
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
