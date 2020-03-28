import { Entity, Column,  ObjectIdColumn  } from "typeorm";

@Entity({ name: 'messages' })
export class Message {
  @ObjectIdColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  author: string;
}
