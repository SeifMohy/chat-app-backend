import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import AppDataSource from "./data-source";
import { authRouter } from "./routes/auth";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:7090",
  },
});

dotenv.config();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/auth", authRouter);

app.get("/", function (req, res) {
  res.send("server is running");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (message)=>{
      console.log(message);
      io.emit("new message", message);
  })
});
server.listen(process.env.PORT || 4545, async () => {
  await AppDataSource.initialize();
  console.log("connected to DB");
});
