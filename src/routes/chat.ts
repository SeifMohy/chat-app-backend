import express from "express";
import { Conversation } from "../entities/conversation";
import { Message } from "../entities/message";
import { User } from "../entities/user";

const chatRouter = express.Router();

chatRouter.get("/user/:userId", async (req, res) => {
  //to find conversations by userId and provide last message
  try {
    const { userId } = req.params;

    const userChats = await User.find({
      where: { id: +userId },
      relations: { conversations: { messages: { user: true }, users: true } },
    });

    if (!userChats) {
      res.status(404).json("user does not have chats");
    }
    return res.status(200).json(userChats);
  } catch (error) {
    res.status(500).json({ error });
  }
});

chatRouter.get("/:conversationId", async (req, res) => {
  //to find a specific conversation with messages and users
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.find({
      where: { id: +conversationId },
      relations: { messages: { user: true }, users: true },
    });

    if (!conversation) {
      res.status(404).json("conversation does not exist");
    }
    return res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error });
  }
});

chatRouter.get("/otherUser/:conversationId", async (req, res) => {
  //to find the other user
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findOne({
      where: { id: +conversationId },
      relations: { users: true},
    });

    if (!conversation) {
      res.status(404).json("conversation does not exist");
    }
    return res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

chatRouter.post("/send/:userId/:conversationId", async (req, res) => {
  //to save sent messages
  try {
    const { userId, conversationId } = req.params;

    const user = await User.findOneBy({ id: +userId });
    const conversation = await User.findOneBy({ id: +conversationId });

    if (!user) {
      return res.status(400).json({
        message: "Please Login",
      });
    }
    if (!conversation) {
      return res.status(404).json({
        message: "conversation not found",
      });
    }

    const { message } = req.body;

    const text = Message.create({
      message,
      user,
      conversation,
    });

    await text.save();
    return res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { chatRouter };
