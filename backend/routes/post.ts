import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./auth";

const router = express.Router();

const client = new PrismaClient();

const SELECT = {
  id: true,
  createdAt: true,
  title: true,
  content: true,
  userID: true,
  user: {
    select: {
      account: true,
    },
  },
};

const PAGE_COUNT = 10;

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
      select: SELECT,
    });

    return res.json({ ok: true, post });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//글 조회
router.get("/", async (req, res) => {
  try {
    const { page } = req.query;

    if (!page || isNaN(+page)) {
      return res.status(400).json({
        message: "Wrong Page",
      });
    }

    const posts = await client.post.findMany({
      skip: +page * PAGE_COUNT,
      take: PAGE_COUNT,
      orderBy: {
        id: "desc",
      },
      select: SELECT,
    });

    return res.json({
      ok: true,
      posts: posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//전체 글 갯수
router.get("/count", async (req, res) => {
  try {
    const posts = await client.post.findMany();
    return res.json({
      count: posts.length,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
