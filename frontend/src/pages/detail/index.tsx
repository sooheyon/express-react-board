import React, { FC, useEffect, useState } from "react";
import { useMe } from "../../hooks";
import { Header } from "../../components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Comment from "./components/Comment";
import axios from "axios";
import { IPost } from "../main";
import { MdHomeFilled } from "react-icons/md";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const Detail: FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost>();
  const { account, getMe } = useMe();
  const { postID } = useParams();
  const [editToggle, setEditToggle] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/post/${postID}`
      );

      setPost(response.data.post);
      setTitle(response.data.post.title);
      setContent(response.data.post.content);
    } catch (error) {
      console.log(error);
    }
  };

  const clickEditComplete = async () => {
    try {
      if (!title && !content) return;

      if (title === post?.title && content === post?.content) return;

      const response = await axios.put(
        `${process.env.REACT_APP_BACK_URL}/post/${postID}`,
        {
          title,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPost(response.data.post);
      setTitle(response.data.post.title);
      setContent(response.data.post.content);
      setEditToggle(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clickDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACK_URL}/post/${postID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const clickEdit = () => {
    setEditToggle((prev) => !prev);
  };

  const clickDeleteModal = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
            <div className="flex flex-row justify-between">
              <Link to="/">
                <button className="button-style">
                  <MdHomeFilled size={24} />
                </button>
              </Link>
              <div className="flex flex-row gap-2 items-center">
                {editToggle && (
                  <button onClick={clickEditComplete}>
                    <FaRegEdit size={24} />
                  </button>
                )}

                {account === post.user.account && (
                  <button onClick={clickEdit}>
                    {editToggle ? (
                      <MdOutlineCancel size={24} />
                    ) : (
                      <FaRegEdit size={24} />
                    )}
                  </button>
                )}

                <button className="button-style" onClick={clickDeleteModal}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>

            <div className="border-b-2">
              {editToggle ? (
                <div className="bg-red-100 text-center py-[26px] px-20">
                  <input
                    type="text"
                    value={title}
                    className="input-style w-full"
                    onChange={changeTitle}
                  />
                </div>
              ) : (
                <h1 className="text-center font-bold py-8 text-2xl">
                  {post.title}
                </h1>
              )}

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
            {editToggle ? (
              <div className="px-20 pt-12">
                <textarea
                  className="input-style w-full h-96 resize-none"
                  value={content}
                  onChange={changeContent}
                  name=""
                  id=""
                />
              </div>
            ) : (
              <div className="px-20 pt-12 min-h-[360px]">{post.content}</div>
            )}
          </div>
        ) : (
          <div></div>
        )}

        <Comment postID={+(postID ?? "1")} />
      </main>
      {deleteModalOpen && (
        <div className="flex fixed w-full h-full bg-black top-0 left-0 bg-opacity-50 justify-center items-center">
          <div className="bg-white text-xl  p-8 rounded-md">
            <div className="text-right">
              <button>
                <MdOutlineCancel size={24} onClick={clickDeleteModal} />
              </button>
            </div>
            <h1 className="mt-8">정말 삭제하시겠습니까?</h1>
            <div className="mt-4 flex flex-row justify-center">
              <button className="button-style" onClick={clickDelete}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
