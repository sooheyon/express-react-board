import React, { FC, useEffect, useState } from "react";
import { Header, PostCard, Loading } from "../../components";
import axios from "axios";
import { useMe } from "../../hooks";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

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

export const MAX_PAGE_ITEM_COUNT = 10;

const Main: FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [posts, setPosts] = useState<IPost[]>();
  const { account, getMe } = useMe();

  const getPosts = async (selectedPage: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/post?page=${selectedPage}`
      );
      console.log(response);

      setPosts(response.data.posts);
      setPage(selectedPage);
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/post/count`
      );
      setTotalPage(Math.floor(response.data.count / 10));
    } catch (error) {
      console.log(error);
    }
  };

  const pageComp = () => {
    let pageCompArray = [];

    for (let i = 0; i <= totalPage; i++) {
      const clickPageComp = () => {
        getPosts(i);
      };

      pageCompArray.push(
        <li
          key={i}
          className={`${
            page === i ? "font-bole" : "text-gray-300 hover:text-black"
          }`}
        >
          <button disabled={page === i ? true : false} onClick={clickPageComp}>
            {i + 1}
          </button>
        </li>
      );
    }

    return pageCompArray;
  };

  const clickCreate = () => {
    navigate("/create");
  };

  useEffect(() => {
    getMe();
    getPosts(0);
    getCount();
  }, []);

  return !!posts ? (
    <div>
      <Header account={account} />
      <main className="max-w-screen-md mx-auto px-4 pb-20">
        <h1 className="mt-20 text-center font-bold text-2xl">수현이 게시판</h1>
        <div className="tool-box flex justify-end">
          {!!account && (
            <button
              onClick={clickCreate}
              className="transition-all hover:bg-gray-100 rounded-md  py-[4px] px-[8px]"
            >
              <HiOutlineDocumentPlus size={24} />
            </button>
          )}
        </div>
        <ul className="mt-10 min-h-[440px]">
          <li className="flex justify-between border-b-2 font-semibold">
            <span className="w-1/12 p-2 text-center"></span>
            <span className="w-1/12 p-2 text-center">ID</span>
            <span className="w-6/12 p-2 text-center">제목</span>
            <span className="w-2/12 p-2 text-center">사용자</span>
            <span className="w-2/12 p-2 text-center">작성일</span>
          </li>
          {posts.map((v, i) => {
            return <PostCard page={page} key={`${i}`} post={v} index={i} />;
          })}
        </ul>
        <ul className="flex text-lg justify-center mt-4 gap-2">
          {!!totalPage && pageComp()}
        </ul>
      </main>
    </div>
  ) : (
    <Loading />
  );
};

export default Main;
