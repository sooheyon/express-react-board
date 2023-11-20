import axios from "axios";
import React, { useState } from "react";

const useMe = () => {
  const [account, setAccount] = useState<string>("");

  const getMe = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAccount(response.data.account);
      return response.data.account;
    } catch (error) {
      console.error(error);
      return;
    }
  };
  return {
    account,
    getMe,
  };
};

export default useMe;
