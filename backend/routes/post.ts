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

//글 한개 조회
router.get("/:postID", async (req, res) => {
  try {
    const { postID } = req.params;

    if (!postID || isNaN(+postID)) {
      return res.status(400).json({
        message: "Not exist post id",
      });
    }

    const post = await client.post.findUnique({
      where: {
        id: +postID,
      },
      select: SELECT,
    });

    if (!post) {
      return res.status(400).json({
        message: "Not exist post",
      });
    }

    return res.json({ post });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

//수정
router.put("/:postID", verifyToken, async (req: any, res) => {
  try {
    const { postID } = req.params;
    const { title, content } = req.body; //get 요청에서는 크로스 브라우징 이슈 있음
    const { user } = req;

    if (!postID || isNaN(+postID)) {
      return res.status(400).json({
        message: "Not exist post id",
      });
    }

    if (
      (!title || title.trim().length === 0) &&
      !content &&
      content.trim().length === 0
    ) {
      return res.status(400).json({
        message: "Not exist data",
      });
    }

    const existPost = await client.post.findUnique({
      where: { id: +postID },
    });

    if (!existPost || existPost.userID !== user.id) {
      return res.status(400).json({
        message: "Not exist post",
      });
    }

    const updatedPost = await client.post.update({
      where: {
        id: +postID,
      },
      data: {
        title: title ?? existPost.title,
        content: content ?? existPost.content,
      },
      select: SELECT,
    });

    return res.json({ post: updatedPost });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

//삭제
//수정
router.delete("/:postID", verifyToken, async (req: any, res) => {
  try {
    const { postID } = req.params;
    const { user } = req;

    if (!postID || isNaN(+postID)) {
      return res.status(400).json({
        message: "Not exist post id",
      });
    }

    const existPost = await client.post.findUnique({
      where: { id: +postID },
    });

    if (!existPost || existPost.userID !== user.id) {
      return res.status(400).json({
        message: "Not exist post",
      });
    }

    //스키마에 보존해주겠다라는 설정 추가 또는 아래 함수 추가
    await client.comment.deleteMany({
      where: {
        postID: existPost.id,
      },
    });

    const deletedPost = await client.post.delete({
      where: {
        id: +postID,
      },
    });

    return res.json({ id: deletedPost.id });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
