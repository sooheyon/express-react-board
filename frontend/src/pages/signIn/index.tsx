import axios from "axios";
import React, { FormEvent, useState } from "react";

const SignIn = () => {
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAccount(inputValue);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  };

  const onSubmitSignIn = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!account || !password) return;

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/auth`,
        { account, password }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center pb-20">
      <h1 className="text-2xl font-bold">h662's Board Log In</h1>
      <form className="mt-8 flex items-end gap-4" onSubmit={onSubmitSignIn}>
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
          <button className="absolute -bottom-5 left-2 text-xs text-blue-500 active:text-blue-700">
            Create an account
          </button>
        </div>
        <input className="button-style" type="submit" value="Log In" />
      </form>
    </main>
  );
};

export default SignIn;
