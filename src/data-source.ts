import { config } from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

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
  entities: [],
  migrations: ['migration/*.ts'],
  subscribers: [],
})

export default AppDataSource
