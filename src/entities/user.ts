import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Conversation } from './conversation'
import { Message } from './message'

@Entity('User_Chat')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true})
  email: string

  @Column()
  password: string

  @Column({nullable: true})
  avatarUrl: string

  @Column({default: false})
  online: boolean

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date

  @OneToMany(()=> Message, message => message.user)
  messages: Message[];

  @ManyToMany(() => Conversation)
  @JoinTable()
  conversations: Conversation[];

}
