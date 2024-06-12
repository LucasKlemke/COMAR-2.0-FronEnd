import { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Header } from "../components/header/Header";
import { Content } from "../components/content/Content";
import axios from "axios";
import { Toaster, toast } from "sonner";
import SignUp from "../components/login/SingUp";
import SignIn from "../components/login/SingIn";

//Default URL
const API = "http://localhost:3000/";
//EndPoint Projetos
const EPPROJETOS = `${API}projeto`;
//EndPoint Usuarios
const EPUSUARIOS = `${API}usuario`;

//Função para conectar a API
async function connect() {
  try {
    let res = await axios.get(EPPROJETOS);

    const resposta = res.data;

    return resposta;
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
}

function System() {
  // Array de projetos
  const [projetos, setProjetos] = useState([]);
  // Definir ID do projeto atual
  const [projetoAtual, setProjetoAtual] = useState("");

  // Verificação para não repetir a requisição ( GET )
  const jaFoi = useRef(false);

  useEffect(() => {
    // Verificação para não repetir a requisição ( GET )
    if (!jaFoi.current) {
      jaFoi.current = true;
      connect().then((resposta) => {
        resposta.forEach((element) => {
          setProjetos((state) => [...state, element]);
        });
      });
    }
  });

  // Mudar o ID de projeto atual
  const handleProjetoSelect = (ev) => {
    setProjetoAtual(ev.target.value);
  };

  return (
    <>
      <Toaster richColors position="top-center" duration={500} />
      <Header
        setProjetoAtual={setProjetoAtual}
        setProjetos={setProjetos}
        projetos={projetos}
        projetoAtual={projetoAtual}
        handleProjetoSelect={handleProjetoSelect}
      />
      <Content
        setProjetos={setProjetos}
        setProjetoAtual={setProjetoAtual}
        projetoAtual={projetoAtual}
        projetos={projetos}
        API={API}
      />
      {/* <SignUp/> */}
      {/* <SignIn/> */}
    </>
  );
}

export default System;
