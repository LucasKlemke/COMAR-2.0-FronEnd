import { AccountCircle, Public } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { NewProject } from "../content/modals/NewProject";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

export const Header = ({ projetos, handleProjetoSelect, projetoAtual,setProjetoAtual, setProjetos, usuario, setUsuario }) => {
  const StyledSelect = styled(Select)({
    backgroundColor: "white",
    color: "black",
  });

  const navigate = useNavigate()

  const goToLoginPage = () => {
    localStorage.removeItem('auth')
    navigate('/')
  }

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  // Abrir modal para criar novo projeto
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // --------------------------------------

  return (
    <>
      <NewProject open={open} handleClose={handleClose} projetos={projetos} setProjetos={setProjetos} setProjetoAtual={setProjetoAtual} />
      <AppBar position="static" sx={{ width: { xs: "100%" } }}>
        <StyledToolbar>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography
              variant="h4"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              COMAR
            </Typography>
            <Public fontSize="large" />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h5">Projetos:</Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <StyledSelect value={projetoAtual} onChange={handleProjetoSelect} disabled = {projetos.length ? false : true}>
                {projetos.map((projeto) => (
                  <MenuItem key={projeto.id} value={projeto.id}>
                    {projeto.nome}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
            <Button variant="contained" onClick={handleOpen}>
              Novo
            </Button>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography>{usuario.toUpperCase()}</Typography>
            <Profile setUsuario={setUsuario} goToLoginPage={goToLoginPage}/>
          </Stack>
        </StyledToolbar>
      </AppBar>
    </>
  );
};
