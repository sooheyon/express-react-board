import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
const port: number = +process.env.PORT! | 3010; // 느낌표는 이 변수 있다라고 확신 시키는 용도

//json 컴파일러 역할 미들웨어 설치
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //extended:true 필수

//cors 풀어주기 - cors 설치 필요
app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello, ExpressTS!!");
}); //ssr은 send시 html 던지기

app.listen(port, () => {
  console.log(`🚀 Server is listening on port: ${port}`);
});
