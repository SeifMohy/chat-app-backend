import {
  BaseEntity,
  Entity,
  JoinTable,
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

  @ManyToMany(() => User, user=> user.conversations)
  @JoinTable()
  users: User[];
}
