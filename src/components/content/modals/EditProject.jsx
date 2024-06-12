import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { successMessage, errorMessage } from "../toast/toast";

export const EditProject = ({ open, handleClose, projetoNome, projetoID, setNomeprojeto, saldo, projetos, setProjetos }) => {
  const [nome, setNome] = useState(projetoNome);
  

  const alterarNomeProjeto = async(ev) => {
    ev.preventDefault()
    if (
      nome == "" ||
      nome.length > 20 ||
      nome.length < 1
    ) {
      errorMessage();
    } else {
      handleClose();
      await axios.put(`http://localhost:3000/projeto/${projetoID}`,{ nome, saldo })
     let newArray = projetos.map((element) =>  {if(element.id == projetoID) {
         element.nome = nome
         return element
      } else {
        return element
      }})
      setProjetos(newArray)
      setNomeprojeto(nome)
      successMessage("Nome do projeto alterado com sucesso!");
    }
  };

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
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={alterarNomeProjeto}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4">
          Alterar nome do projeto:
        </Typography>
        <Stack direction="column" spacing={2} sx={{ pt: 4 }}>
          <TextField
            required
            id="outlined-basic"
            value={nome}
            variant="outlined"
            onChange={(e) => setNome(e.target.value)}
          />
          <Button variant="contained" type='submit'>
            Alterar
          </Button>
        </Stack>
      </Box>
      </form>
    </Modal>
  );
};
