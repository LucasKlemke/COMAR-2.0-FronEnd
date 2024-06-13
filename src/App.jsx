import React, { useState } from "react";
import "./App.css";
import System from "./pages/System";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SingIn";
// import SignUp from "./components/login/SingUp";

export default function App() {
  const [usuario, setUsuario] = useState("");
  //id de validacao
  const [validacao, setValidacao] = useState("")

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<SignIn setUsuario={setUsuario} setValidacao={setValidacao} />} />
          <Route
            path="/system"
            element={<System setUsuario={setUsuario} usuario={usuario} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
