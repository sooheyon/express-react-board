import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const client = new PrismaClient();

// 유저 생성
router.post("/", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    //express는 여기까지만 하면 무한로딩에 빠짐
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
