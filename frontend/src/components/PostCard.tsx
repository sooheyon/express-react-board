import React, { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { IPost, MAX_PAGE_ITEM_COUNT } from "../pages/main";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface PostCardProps {
  page: number;
  post: IPost;
  index: number;
}

const PostCard: FC<PostCardProps> = ({ page, post, index }) => {
  // 항목의 순서를 의미
  const listIndex = useMemo(
    () => MAX_PAGE_ITEM_COUNT * page + index + 1,
    [page]
  );

  return (
    <Link to={`/${post.id}`}>
      <li
        className={`flex justify-between ${
          index % 2
            ? "bg-gray-300 hover:opacity-80"
            : "bg-white hover:opacity-60"
        } transition-opacity`}
      >
        <span className="w-1/12 p-2 text-right">{listIndex}</span>
        <span className="w-1/12 p-2 text-right">{post.id}</span>
        <span className="w-6/12 p-2">{post.title}</span>
        <span className="w-2/12 p-2 text-center">{post.user.account}</span>
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
