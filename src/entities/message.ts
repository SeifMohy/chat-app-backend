import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Conversation } from './conversation'
import {User} from "./user"

@Entity('Message_Chat')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date

  @ManyToOne(()=> User, user => user.messages)
  user: User;

  @ManyToOne(()=> Conversation, conversation => conversation.messages)
  conversation: Conversation;
}
