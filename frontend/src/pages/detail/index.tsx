import React, { FC, useEffect, useState } from "react";
import { useMe } from "../../hooks";
import { Header } from "../../components";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Comment from "./components/Comment";
import axios from "axios";
import { IPost } from "../main";
import { MdHomeFilled } from "react-icons/md";

const Detail: FC = () => {
  const [post, setPost] = useState<IPost>();
  const { account, getMe } = useMe();
  const { postID } = useParams();

  const getPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/post/${postID}`
      );

      setPost(response.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
    getPost();
  }, []);

  return (
    <>
      <Header account={account} />
      <main className="max-w-screen-md mx-auto py-24">
        {post ? (
          <div>
            <Link to="/">
              <button className="button-style">
                <MdHomeFilled size={24} />
              </button>
            </Link>

            <div className="border-b-2">
              <h1 className="text-center font-bold py-8 text-2xl">
                {post.title}
              </h1>
              <div className="text-right pb-2 text-sm px-20">
                <span>{post.user.account}, </span>
                <span>
                  {formatDistanceToNow(new Date(post.createdAt!), {
                    locale: ko,
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
            <div className="px-20 pt-12 min-h-[360px]">{post.content}</div>
          </div>
        ) : (
          <div></div>
        )}

        <Comment postID={+(postID ?? "1")} />
      </main>
    </>
  );
};

export default Detail;
