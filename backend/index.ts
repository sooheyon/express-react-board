import express, { Express } from "express";

const app: Express = express();
const port: number = +process.env.PORT! | 3010; // 느낌표는 이 변수 있다라고 확신 시키는 용도

app.get("/", (req, res) => {
  res.send("Hello, ExpressTS!!");
}); //ssr은 send시 html 던지기

app.listen(port, () => {
  console.log(`🚀 Server is listening on port: ${port}`);
});
