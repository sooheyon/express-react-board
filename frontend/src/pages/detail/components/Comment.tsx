import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import CommentCard from "./CommentCard";

interface CommentProps {
  postID: number;
}

interface User {
  account: string;
}

export interface IComment {
  content: string;
  createdAt: Date;
  id: number;
  postID: number;
  updatedAt: Date;
  userID: number;
  user: User;
}

const Comment: FC<CommentProps> = ({ postID }: CommentProps) => {
  const [content, setContent] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>([]);

  const getComments = async () => {
    try {
      console.log("postID", postID);

      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/comment?postID=${postID}`
      );

      console.log(response);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!content || content.trim().length === 0) return;

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/comment`,
        {
          content,
          postID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
      setComments([response.data.comment, ...comments]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const commentsMap = comments?.map((cmt, idx) => (
    <CommentCard key={`comment-${idx}`} comment={cmt} />
  ));

  return (
    <div className="px-4 ">
      <form className="flex flex-col pt-12" onSubmit={submitComment}>
        <textarea
          value={content}
          onChange={changeContent}
          className="px-4 py-2 h-28 rounded-md resize-none focus:outline-none border-2 focus:border-blue-300"
        />
        <input
          className="self-end mt-2 button-style"
          type="submit"
          value="Create"
        />
      </form>
      <ul className="pt-2">{commentsMap}</ul>
    </div>
  );
};

export default Comment;
