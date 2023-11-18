import express, { NextFunction, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const client = new PrismaClient();

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

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Not exist user",
      });
    }

    const isComparedPassword = bcrypt.compareSync(password, user.password);

    if (!isComparedPassword) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ account }, process.env.JWT_SECRET!);

    return res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

interface VerifyResponse {
  account: string;
}

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction //next - token 검증 후 다음 라우터로 보내줌
) => {
  try {
    //bearer
    const token = req.headers.authorization.substring(7);
    if (!token) {
      return res.status(400).json({
        message: "Not exist token",
      });
    }

    const { account } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as VerifyResponse;

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Not exist user",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "Not verified token",
    });
  }
};

export default router;
