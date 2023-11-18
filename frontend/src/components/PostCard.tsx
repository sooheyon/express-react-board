import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IPost } from "../pages/main";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface PostCardProps {
  post: IPost;
  index: number;
}

const PostCard: FC<PostCardProps> = ({ post, index }) => {
  return (
    <Link to={`/${post.id}`}>
      <li
        className={`flex justify-between ${
          index % 2 ? "bg-gray-300" : "bg-white"
        }`}
      >
        <span className="w-2/12 p-2 text-right">{post.id}</span>
        <span className="w-6/12 p-2">{post.title}</span>
        <span className="w-2/12 p-2ext-center">{post.user.account}</span>
        <span className="w-2/12 p-2 text t-center">
          {formatDistanceToNow(new Date(post.createdAt), {
            locale: ko,
            addSuffix: true,
          })}
        </span>
      </li>
    </Link>
  );
};

export default PostCard;
