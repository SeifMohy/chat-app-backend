import { config } from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Conversation } from './entities/conversation'
import { Message } from './entities/message'
import { User } from './entities/user'

config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.DB_PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.NAME,
  synchronize: true,
  logging: false,
  entities: [User, Message, Conversation],
  migrations: ['migration/*.ts'],
  subscribers: [],
})

export default AppDataSource
