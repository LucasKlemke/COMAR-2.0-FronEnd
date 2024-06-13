import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const SingUp = ({
  user,
  setUser,
  password,
  setPassword,
  setPasswordConfirm,
  passwordConfirm,
  handleSubmit,
}) => {
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={1} sx={{ pb: 2 }}>
          <Stack direction="row" spacing={1}>
            <Typography id="modal-modal-title" variant="h6">
              Cadastrar novo usuário
            </Typography>
          </Stack>

          <TextField
            id="outlined-basic"
            label="Nome de usuario"
            variant="outlined"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <TextField
            type="password"
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            type="password"
            id="outlined-basic"
            label="Confirmar senha"
            variant="outlined"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <Button variant="contained" type="submit">
            Cadastrar
          </Button>
        </Stack>
      </form>
      <hr />
    </>
  );
};

export default SingUp;
