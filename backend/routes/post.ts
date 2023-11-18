import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./auth";

const router = express.Router();

const client = new PrismaClient();

//글 생성
router.post("/", verifyToken, async (req: any, res) => {
  try {
    const { title, content } = req.body;
    const { user } = req;

    if (
      !title ||
      !content ||
      title.trim().length === 0 ||
      content.trim().length === 0
    ) {
      return res.status(400).json({
        message: "Not exist data",
      });
    }

    const post = await client.post.create({
      data: { title, content, userID: user.id },
      select: {
        id: true,
        createdAt: true,
        title: true,
        content: true,
        user: {
          select: {
            account: true,
          },
        },
      },
    });

    return res.json({ ok: true, post });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
