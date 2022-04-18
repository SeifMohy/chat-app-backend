import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

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

}
