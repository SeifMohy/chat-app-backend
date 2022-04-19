import cors from 'cors'
import dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import AppDataSource from './data-source'
import { authRouter } from './routes/auth'

const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

dotenv.config()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: false }))

app.use('/auth', authRouter)

app.get('/', function (req, res) {
  res.send('server is running')
})
app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/index.html')
  })

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

app.listen(process.env.PORT || 4545, async () => {
  await AppDataSource.initialize()
  console.log('connected to DB')
})
