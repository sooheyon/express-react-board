import React, { FC, useEffect } from "react";
import { useMe } from "../../hooks";
import { Header } from "../../components";
import { useParams, useSearchParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Comment from "./components/Comment";

const Detail: FC = () => {
  const { account, getMe } = useMe();
  const { postID } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();

  const title = searchParam.get("title");
  const content = searchParam.get("content");
  const createdAt = searchParam.get("created-at");
  const userAccount = searchParam.get("user-account");

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <Header account={account} />
      <main className="max-w-screen-md mx-auto py-24">
        <div>
          <div className="border-b-2">
            <h1 className="text-center font-bold py-8 text-2xl">{title}</h1>
            <div className="text-right pb-2 text-sm px-20">
              <span>{userAccount}, </span>
              <span>
                {formatDistanceToNow(new Date(createdAt!), {
                  locale: ko,
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <div className="px-20 pt-12 min-h-[360px]">{content}</div>
        </div>

        <Comment postID={+(postID ?? "1")} />
      </main>
    </>
  );
};

export default Detail;
