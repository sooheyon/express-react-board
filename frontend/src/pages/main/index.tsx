import React, { FC, useEffect, useState } from "react";
import { Header, PostCard } from "../../components";
import axios from "axios";

export interface IPost {
  id: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  content: string;
  user: {
    account: string;
  };
}

const Main: FC = () => {
  const [account, setAccount] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<IPost[]>([]);

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

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/post?page=${page}`
      );
      console.log(response);

      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
    getPosts();
  }, []);

  return posts.length > 0 ? (
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
          {posts.map((v, i) => {
            return <PostCard key={`${i}`} post={v} index={i} />;
          })}
        </ul>
        <ul className="flex text-lg justify-center">
          <li>페이지</li>
        </ul>
      </main>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Main;
