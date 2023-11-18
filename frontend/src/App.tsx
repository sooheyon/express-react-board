import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages";
import SignIn from "./pages/signIn";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<Main />}></Route>
        <Route path="/create" element={<Main />}></Route>
        <Route path="/:postID" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
