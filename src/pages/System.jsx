import { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Header } from "../components/header/Header";
import { Content } from "../components/content/Content";
import axios from "axios";
import { Toaster, toast } from "sonner";
// import SignUp from "../components/login/SingUp";
import SignIn from "./SingIn";
import { Navigate, useNavigate } from "react-router-dom";

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

function System({ usuario, setUsuario }) {
  const navigate = useNavigate();
  let auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    
    if(auth == null){
      navigate('/')
    }


    const fetchData = async (auth) => {
      let response = await axios.get(
        `http://localhost:3000/usuario/${auth.id}`
      );
      if (
        response.data == null ||
        response.data == undefined ||
        response.data == "" ||
        response.data == []
      ) {
        navigate("/");
      } else {
        
        let usuarioReal = response.data[0];
        if (
          auth.id != usuarioReal.id ||
          auth.email != usuarioReal.email ||
          auth.senha != usuarioReal.senha ||
          auth == null ||
          auth == undefined ||
          auth == ""
        ) {
          navigate("/");
        } else {
          setUsuario(auth.email)
        }
      }
    };

    fetchData(auth);
  },[auth]);

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
        setUsuario={setUsuario}
        usuario={usuario}
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
