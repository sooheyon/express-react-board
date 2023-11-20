import React, { useEffect, useState } from "react";

const Loading = () => {
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoadingText((prev) => {
        console.log(prev.length);
        if (prev.length >= 3) {
          return "";
        }
        return prev + ".";
      });
    }, 1000);
  }, [loadingText]);

  return (
    <div className="flex min-w-screen min-h-screen items-center justify-center">
      <p className="font-bold text-[32px]">Loading{loadingText}</p>
    </div>
  );
};

export default Loading;
