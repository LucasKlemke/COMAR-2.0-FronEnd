import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { successMessage } from "../toast/toast";

export const DeletProject = ({
  projetoNome,
  open,
  handleClose,
  projetoID,
  projetos,
  setProjetos,
  setProjetoAtual,
}) => {
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

  const deletarProjeto = async (ev) => {
    ev.preventDefault();
    await axios.delete(`http://localhost:3000/projeto/${projetoID}`);
    const newProjetosArray = projetos.filter(
      (element) => element.id != projetoID
    );
    setProjetos(newProjetosArray);
    setProjetoAtual("");
    handleClose();
    successMessage("Projeto excluido!");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4">
          {`Deletar projeto ${projetoNome} ?`}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ pt: 4 }}>
          <Button onClick={deletarProjeto} variant="contained">
            Sim
          </Button>
          <Button onClick={handleClose} variant="contained">
            Não
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
