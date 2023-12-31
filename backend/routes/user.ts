import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verify } from "crypto";
import { verifyToken } from "./auth";

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

    const hashedPassword = bcrypt.hashSync(password, 10);

    await client.user.create({
      data: { account, password: hashedPassword },
    });

    const token = jwt.sign({ account }, process.env.JWT_SECRET!);

    return res.json({ ok: true, token });
  } catch (error) {
    console.error(error);
    //express는 여기까지만 하면 무한로딩에 빠짐
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

//유저 확인
router.get("/", verifyToken, async (req: any, res) => {
  try {
    const { account } = req.user;

    return res.json({ account });
  } catch (error) {
    console.error(error);
    //express는 여기까지만 하면 무한로딩에 빠짐
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
