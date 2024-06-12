import React from "react";
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
import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import { errorMessage, infoMessage, successMessage } from "../toast/toast";

export const NewProject = ({ open, handleClose, projetos, setProjetos, setProjetoAtual }) => {
  const [nomeProjeto, setNomeProjeto] = useState("");
  // -----------------------

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
    setNomeProjeto("");
    infoMessage('Campos Limpos')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificação de input
    if (nomeProjeto.length > 2 && nomeProjeto.length < 20 && nomeProjeto != "") {
      let retorno = await axios.post(`http://localhost:3000/projeto/`, { nome: nomeProjeto });
      setProjetos((prev) => [...prev, retorno.data])
      setProjetoAtual(retorno.data.id)
      successMessage('Novo projeto adicionado')
      setNomeProjeto("");
      handleClose()
    } else {
        errorMessage('Campos inválidos')
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
          Adicionar novo projeto
          <Button onClick={() => limparCampos()}>Limpar</Button>
        </Typography>
        <form sx={{ width: "100%" }} onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2} sx={{ pt: 4 }}>
            <TextField
              value={nomeProjeto}
              id="outlined-basic"
              label="Projeto"
              variant="outlined"
              onChange={(e) => setNomeProjeto(e.target.value)}
              required
            />
            <Button variant="contained" type="submit">
              Adicionar
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
