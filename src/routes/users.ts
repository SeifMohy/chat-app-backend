import express from "express";
import { Not } from "typeorm";
import { Conversation } from "../entities/conversation";
import { Message } from "../entities/message";
import { User } from "../entities/user";

const userRouter = express.Router();

userRouter.get("/:userId", async (req, res) => {
  //to send all users
  try {
    const { userId } = req.params;

    const users = await User.find({
      where: { id: Not(+userId) },
    });

    if (!users) {
      res.status(404).json("problems loading user");
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

userRouter.post("/conversation/:userId/:secondUserId", async (req, res) => {
  //to create a new conversation
  try {
    const { userId } = req.params;
    const { secondUserId } = req.params;

    const user1 = await User.find({
      where: { id: +userId },
    });
    const user2 = await User.find({
      where: { id: +secondUserId },
    });

    if (!user1 || !user2) {
      res.status(404).json("problems loading users");
    }

    const conversation = Conversation.create({
      users: [...user1, ...user2],
      messages: [],
    });
    await conversation.save();
    return res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { userRouter };
