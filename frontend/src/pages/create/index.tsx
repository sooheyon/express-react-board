import React, { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components";
import { useMe } from "../../hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { account, getMe } = useMe();

  const submitCreate = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (
        !title ||
        !content ||
        title.trim().length === 0 ||
        content.trim().length === 0
      ) {
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_BACK_URL}/post`,
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

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };
  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <Header account={account} />
      <main className="max-w-screen-md mx-auto py-24">
        <h1 className="text-center font-bold py-8 text-2xl">New Post</h1>
        <form
          className="flex flex-col items-start px-20"
          onSubmit={submitCreate}
        >
          <label htmlFor="title" className="mb-2">
            Title
          </label>
          <input
            id="title"
            className="w-full text-xl px-4 py-2 focus:outline-none focus:border-blue-300 border-2 rounded-md"
            type="text"
            onChange={changeTitle}
          />
          <label htmlFor="content" className="mt-4 mb-2">
            Content
          </label>
          <textarea
            id="content"
            className="w-full text-xl px-4 py-2 h-96 focus:outline-none focus:border-blue-300 border-2 rounded-md resize-none"
            onChange={changeContent}
          />
          <input
            type="submit"
            value="Create"
            className="self-end mt-4 button-style"
          />
        </form>
      </main>
    </>
  );
};

export default Create;
