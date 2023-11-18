import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Create, Main, SignIn, SignUp } from "./pages";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/:postID" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
