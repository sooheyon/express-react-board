import React, { FC, useEffect, useState } from "react";
import { Header } from "../../components";
import axios from "axios";

const Main: FC = () => {
  const [account, setAccount] = useState<string>("");

  const getMe = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAccount(response.data.account);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <Header account={account} />
      <main className="max-w-screen-md mx-auto">
        <h1 className="mt-20 text-center font-bold text-2xl">수현이 게시판</h1>
        <ul className="mt-10 h-[440px]">
          <li className="flex justify-between border-b-2 font-semibold">
            <span className="w-2/12 p-2 text-center">아이디</span>
            <span className="w-6/12 p-2 text-center">제목</span>
            <span className="w-2/12 p-2 text-center">사용자</span>
            <span className="w-2/12 p-2 text-center">작성일</span>
          </li>
          <li>포스트 카드</li>
        </ul>
        <ul className="flex text-lg justify-center">
          <li>페이지</li>
        </ul>
      </main>
    </>
  );
};

export default Main;
