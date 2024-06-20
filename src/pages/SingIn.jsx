import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  successMessage,
  errorMessage,
} from "../components/content/toast/toast";
import { Toaster } from "sonner";
import axios from "axios";
import { Stack } from "@mui/material";
import bcrypt from "bcryptjs";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        COMAR
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn({ setUsuario }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const usuario = {
      email: data.get("email"),
      senha: data.get("password"),
    };
    if (usuario.email === "" || usuario.senha === "") {
      errorMessage("Você deve preencher os campos");
      return;
    }

    try {
      let entrou = false;
      const response = await axios.get("http://localhost:3000/usuario/");
      for (const element of response.data) {
        const senhaValida = await bcrypt.compare(usuario.senha, element.senha);
        if (element.email === usuario.email && senhaValida) {
          setUsuario(element.email);
          const usuario = {
            id: element.id,
            email: element.email,
            senha: element.senha,
          };
          localStorage.setItem("auth", JSON.stringify(usuario));
          navigate("/system");
          entrou = true;
          break;
        }
      }

      if (!entrou) {
        errorMessage("Usuário inválido");
      }
    } catch (error) {
      errorMessage(
        "Ocorreu um erro ao fazer login. Tente novamente mais tarde."
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster richColors position="top-center" duration={1000} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={4} alignItems="center">
            <Typography variant="h4">COMAR</Typography>
            <Typography variant="h5" display={"flex"} alignItems={"center"}>
              Página de login
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon fontSize="medium" />
              </Avatar>
            </Typography>
          </Stack>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuário"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
