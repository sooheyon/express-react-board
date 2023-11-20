import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";

interface HeaderProps {
  account: string;
}

const Header: FC<HeaderProps> = ({ account }) => {
  const navigate = useNavigate();
  const clickSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header
      className={`max-w-screen-md mx-auto flex items-center p-4 ${
        account ? "" : "justify-end"
      }`}
    >
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
        <div>
          <Link className="text-blue-500 hover:text-blue-700" to="/sign-in">
            Sign In
          </Link>
          <Link
            className="ml-4 text-blue-500 hover:text-blue-700"
            to="/sign-up"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
