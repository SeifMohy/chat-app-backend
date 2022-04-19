import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import {User} from "./user"

@Entity('Message_Chat')
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date

  @Column()
  receiver: string

  @OneToOne(()=> User, user => user.message)
  @JoinColumn()
  user: User;

}
