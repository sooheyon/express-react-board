import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  account: string;
}

const Header = ({ account }: HeaderProps) => {
  return (
    <header className="max-w-screen-md mx-auto flex justify-between items-center p-4">
      <div>
        <span className="font-semibold">{account}</span>님 환영합니다!
        <Link className="button-style" to="/create">
          Create
        </Link>
      </div>
      <div>
        <Link className="text-blue-500 hover:text-blue-700" to="/sign-in">
          Sign In
        </Link>
        <Link className="ml-4 text-blue-500 hover:text-blue-700" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
