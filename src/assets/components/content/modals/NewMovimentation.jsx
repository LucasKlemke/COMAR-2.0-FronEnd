import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CurrencyInput from "react-currency-input-field";
import { Toaster, toast } from "sonner";
import axios from "axios";

export const NewMovimentation = ({
  open,
  handleClose,
  setProjetos,
  projetos,
  projetoAtual,
  setMovimentacao,
  movimentacao
}) => {
  const [data, setData] = useState(dayjs());
  const [historico, setHistorico] = useState("");
  const [documento, SetDocumento] = useState("");
  const [valor, setValor] = useState("");
  const [fornec, setFornec] = useState("");
  const [nf, setNf] = useState("");
  const [isEntrada, setIsEntrada] = useState(true);
  const successMessage = () => toast.success("Adicionado com sucesso!");
  const camposLimpos = () => toast.info("Campos limpos");

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

  const limparCampos = () => {
    setData(dayjs());
    setHistorico("");
    SetDocumento("");
    setValor("");
    setFornec("");
    setNf("");
    setIsEntrada(true);
    camposLimpos();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newObj = {
      valor: +valor,
      dataMovimento: data.format("YYYY-MM-DD"),
      notaFiscal: nf,
      fornecedor: fornec,
      documento: documento,
      historico: historico,
      isEntrada: isEntrada,
    };

    let condicao = true;

    if (condicao) {
      let retorno = await axios.post(
        `http://localhost:3000/projeto/${projetoAtual}/movimentacoes/`,
        newObj
      );
      setMovimentacao((prev) => [...prev, retorno.data])
      
      // setProjetos((prev) => [...prev, retorno.data])
      // setProjetoAtual(retorno.data.id)
      // successMessage('Novo projeto adicionado')
      // setNomeProjeto("");
      setData(dayjs());
      setHistorico("");
      SetDocumento("");
      setValor("");
      setFornec("");
      setNf("");
      setIsEntrada(true);
      handleClose();
      successMessage();
    } else {
      errorMessage("Campos inválidos");
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{ display: "flex", justifyContent: "space-between" }}
          id="modal-modal-title"
          variant="h4"
        >
          Adicionar nova movimentação
          <Button onClick={() => limparCampos()}>Limpar</Button>
        </Typography>
        <form sx={{ width: "100%" }} onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2} sx={{ pt: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                label="Data"
                value={data}
                onChange={(newData) => setData(newData)}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-basic"
              label="Histórico"
              variant="outlined"
              value={historico}
              onChange={(e) => setHistorico(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Documento"
              variant="outlined"
              value={documento}
              onChange={(e) => SetDocumento(e.target.value)}
              required
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
              <OutlinedInput
                required
                type="number"
                value={valor}
                onChange={(e) => {
                  setValor(e.target.value);
                }}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Fornecedor"
              variant="outlined"
              value={fornec}
              onChange={(e) => setFornec(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Nota Fiscal"
              variant="outlined"
              value={nf}
              onChange={(e) => setNf(e.target.value)}
              required
            />
            <RadioGroup>
              <FormLabel>Tipo:</FormLabel>
              <RadioGroup row defaultValue={true} required>
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Entrada"
                  onChange={(e) => setIsEntrada(e.target.value)}
                />
                <FormControlLabel
                  value={'false'}
                  control={<Radio />}
                  label="Saida"
                  onChange={(e) => setIsEntrada(e.target.value)}
                />
              </RadioGroup>
            </RadioGroup>
            <Button variant="contained" type="submit">
              Adicionar
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
