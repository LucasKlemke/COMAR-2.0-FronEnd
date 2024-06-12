import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { BorderAllRounded } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewMovimentation } from "./modals/NewMovimentation";
import { EditProject } from "./modals/EditProject";
import { DeletProject } from "./modals/DeletProject";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const pegarMovimentacoes = async (projeto) => {
  const res = await axios.get(
    `http://localhost:3000/projeto/${projeto.id}/movimentacoes`
  );
  return res.data;
};

export const Content = ({ projetoAtual, projetos, api, setProjetos, setProjetoAtual }) => {
  const [modalMovimentacao, setModalMovimentacao] = useState(false);
  const abrirModalMov = () => setModalMovimentacao(true);
  const fecharModalMov = () => setModalMovimentacao(false);
  const [modalEditProj, setModalEditProj] = useState(false);
  const abrirModalEditProj = () => setModalEditProj(true);
  const fecharModalEditProj = () => setModalEditProj(false);
  const [modalDeleteProj, setModalDeleteProj] = useState(false);
  const abrirModalDeleteProj = () => setModalDeleteProj(true);
  const fecharModalDeleteProj = () => setModalDeleteProj(false);
  const [nomeprojeto,setNomeprojeto] = useState('')
  const [movimentacao, setMovimentacao] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [dadosFormatados, setDadosFormatados] = useState([])
  let informacoesProjetoSelecionado = [];

  projetos.map((projeto) => {
    if (projeto.id == projetoAtual) {
      informacoesProjetoSelecionado = projeto;
    }
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  };


  useEffect(() => {
    // Fetch data when projeto.id changes
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await pegarMovimentacoes(informacoesProjetoSelecionado);
        setMovimentacao(response)
        // Transform data and update tableData directly
        const transformedData = movimentacao.map((element) => ({
          id: element.id,
          historico: element.historico,
          dataMovimento: element.dataMovimento,
          documento: element.documento,
          valor: +element.valor,
          tipo: element.isEntrada,
          saldo: +element.saldo,
          fornecedor: element.fornecedor,
          notaFiscal: element.notaFiscal,
        }));
        // setTableData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projetoAtual]);

  useEffect(() => {
    setNomeprojeto(informacoesProjetoSelecionado.nome)
    
  }, [projetoAtual]);

  const [saldoProjeto, setSaldoProjeto] = useState(informacoesProjetoSelecionado.saldo)

  useEffect(()=> {
    let soma = 0
    movimentacao.map((element) => {
      if(element.isEntrada == true){
        soma = soma + (+element.valor)
       
      } else {
        soma = soma - (+element.valor)
        
      }
     
    })
    setSaldoProjeto(soma)

  }, [movimentacao])
  return (
    <>
      {projetoAtual != 0 ? (
        <>
          <NewMovimentation
            open={modalMovimentacao}
            handleOpen={abrirModalMov}
            handleClose={fecharModalMov}
            setProjetos = {setProjetos}
            projetos = {projetos}
            projetoAtual = {projetoAtual}
            setMovimentacao= {setMovimentacao}
            movimentacao = {movimentacao}
          />
          <EditProject
            setProjetos={setProjetos}
            setProjetoAtual={setProjetoAtual}
            open={modalEditProj}
            handleClose={fecharModalEditProj}
            projetoNome={informacoesProjetoSelecionado.nome}
            projetoID={projetoAtual}
            setNomeprojeto={setNomeprojeto}
            saldo = {informacoesProjetoSelecionado.saldo}
            projetos = {projetos}
          />
          <DeletProject
          setProjetos={setProjetos}
          setProjetoAtual={setProjetoAtual}
          projetos={projetos}
          projetoID={projetoAtual}
            projetoNome={informacoesProjetoSelecionado.nome}
            handleClose={fecharModalDeleteProj}
            open={modalDeleteProj}
          />
          <Container sx={{ py: 3 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ pb: 3, alignItems: "center" }}
            >
              <Typography variant="h4">{nomeprojeto}</Typography>

              <Button
                variant="contained"
                sx={{ alignItems: "center" }}
                fontSize="small"
                onClick={abrirModalEditProj}
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                sx={{ alignItems: "center" }}
                fontSize="small"
                onClick={abrirModalDeleteProj}
              >
                <DeleteIcon />
              </Button>
              <Button
                variant="contained"
                sx={{ alignItems: "center" }}
                fontSize="small"
                onClick={abrirModalMov}
              >
                <Typography
                  fontSize="small"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Nova Movimentação
                </Typography>
                <AddIcon />
              </Button>
              <Typography variant="h5">{`Saldo: R$${saldoProjeto}`}</Typography>
            </Stack>
            <DataTable setMovimentacao={setMovimentacao} movimentacao={movimentacao} projeto={informacoesProjetoSelecionado} api={api} isLoading={isLoading} />
          </Container>
        </>
      ) : (
        <Container>
          <Typography variant="h5" sx={{ py: 3 }}>
            Nenhum Projeto Selecionado
          </Typography>
        </Container>
      )}
    </>
  );
};
