import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";

interface HeaderProps {
  account: string;
}

const Header: FC<HeaderProps> = ({ account }) => {
  const navigate = useNavigate();
  const clickSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const clickSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <header className={`max-w-screen-md mx-auto flex items-center p-4`}>
      {account ? (
        <div className="flex w-full justify-between">
          <div>
            <span className="font-semibold">{account}</span>님 환영합니다!
          </div>
          <button className="button-style" onClick={clickSignOut}>
            <PiSignOut size={24} />
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-end">
          <button className="button-style" onClick={clickSignIn}>
            <IoPersonOutline size={24} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
