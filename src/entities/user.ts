import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
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

  @OneToOne(()=> Message, message => message.user)
  message: Message;

}
