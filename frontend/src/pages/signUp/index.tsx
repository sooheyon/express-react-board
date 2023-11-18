import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const changeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAccount(inputValue);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  };

  const onSubmitSignUp = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!account || !password) return;

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/user`,
        { account, password }
      );

      console.log(response);

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center pb-20">
      <h1 className="text-2xl font-bold">h662's Board Sign Up</h1>
      <form className="mt-8 flex items-end gap-4" onSubmit={onSubmitSignUp}>
        <div className="flex flex-col gap-2 relative">
          <input
            className="input-style"
            type="text"
            value={account}
            onChange={changeAccount}
          />
          <input
            className="input-style"
            type="password"
            value={password}
            onChange={changePassword}
          />
          <div className="absolute -bottom-5 left-2 text-xs">
            Already have an account?
            <Link
              className="ml-1 text-blue-500 active:text-blue-700"
              to="/sign-in"
            >
              Sign In
            </Link>
          </div>
        </div>
        <input className="button-style" type="submit" value="Sign Up" />
      </form>
    </main>
  );
};

export default SignUp;
