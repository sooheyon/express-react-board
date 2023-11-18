import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const router = express.Router();

const client = new PrismaClient();

// 유저 생성
router.post("/", async (req, res) => {
  try {
    const { account, password } = req.body;

    if (
      !account ||
      !password ||
      account.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return res.status(400).json({
        message: "Not exist data",
      });
    }

    const existUser = await client.user.findUnique({
      where: {
        account,
      },
    });

    //account에 해당하는 유저가 이미 있다면 에러
    if (existUser) {
      return res.status(400).json({
        message: "Already exist user",
      });
    }

    const user = await client.user.create({
      data: { account, password },
    });
  } catch (error) {
    console.error(error);
    //express는 여기까지만 하면 무한로딩에 빠짐
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
