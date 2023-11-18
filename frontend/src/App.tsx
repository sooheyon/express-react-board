import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/sign-in" element={<Main />}></Route>
        <Route path="/sign-up" element={<Main />}></Route>
        <Route path="/create" element={<Main />}></Route>
        <Route path="/:postID" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
