import React from "react";
import "./App.css";
import System from "./pages/System";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/login/SingIn";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/system" element={<System />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
