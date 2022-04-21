import {
  BaseEntity,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./message";
import { User } from "./user";

@Entity("Conversation_Chat")
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @ManyToMany(() => User)
  users: User[];
}
