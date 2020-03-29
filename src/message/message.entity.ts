import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  author: string;
}
