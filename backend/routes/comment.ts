import { PrismaClient } from "@prisma/client";
import express from "express";
import { verifyToken } from "./auth";

const router = express.Router();
const client = new PrismaClient();

const SELECT = {
  id: true,
  createdAt: true,
  content: true,
  userID: true,
  user: {
    select: {
      account: true,
    },
  },
  postID: true,
};

//댓글 생성
router.post("/", verifyToken, async (req: any, res) => {
  try {
    const { content, postID } = req.body;
    const { user } = req;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        message: "Not exist content",
      });
    }

    if (isNaN(postID)) {
      return res.status(400).json({
        message: "Post ID is not a number",
      });
    }

    const post = await client.post.findUnique({ where: { id: +postID } });

    if (!post) {
      return res.status(400).json({
        message: "Not exist post",
      });
    }

    const comment = await client.comment.create({
      data: { content, userID: user.id, postID: +postID },
      select: SELECT,
    });

    return res.json({ comment });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

//댓글 가져오기
router.get("/", async (req, res) => {
  try {
    const { postID } = req.query;

    if (!postID || isNaN(+postID)) {
      return res.status(400).json({
        message: "Post ID is not a number",
      });
    }

    const post = await client.post.findUnique({ where: { id: +postID } });

    if (!post) {
      return res.status(400).json({
        message: "Not exist post",
      });
    }

    const comments = await client.comment.findMany({
      where: {
        postID: +postID,
      },
      select: SELECT,
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({ comments });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// 댓글 수정
router.put("/:commentID", verifyToken, async (req: any, res) => {
  try {
    const { commentID } = req.params;
    const { content } = req.body;
    const { user } = req; //verifyToken에서 주는 값

    if (!commentID || isNaN(+commentID)) {
      return res.status(400).json({
        message: "Not exist comment ID",
      });
    }

    if (!content || content.trim().length <= 0) {
      return res.status(400).json({
        message: "Not exist content",
      });
    }

    const existComment = await client.comment.findUnique({
      where: {
        id: +commentID,
      },
    });

    if (!existComment || existComment.userID !== user.id) {
      return res.status(400).json({
        message: "Not exist comment",
      });
    }

    const updatedComment = await client.comment.update({
      where: {
        id: +commentID,
      },
      data: {
        content,
      },
      select: SELECT,
    });

    return res.json({
      comment: updatedComment,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

//댓글 삭제
router.delete("/:commentID", verifyToken, async (req: any, res) => {
  try {
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
