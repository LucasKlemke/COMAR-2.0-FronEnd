import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MenuItem, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteIcon,
} from "@mui/x-data-grid";
import { Height } from "@mui/icons-material";
import SingUp from "../../login/SingUp";
import { errorMessage, successMessage } from "../toast/toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  px: 10,
  pb: 5,
};

const pegarUsuarios = async () => {
  const res = await axios.get(`http://localhost:3000/usuario/`);
  return res.data;
};

export default function Usuarios() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAdicionando(false);
  };
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [adicionando, setAdicionando] = useState(false);

  useEffect(() => {
    // Fetch data when projeto.id changes
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await pegarUsuarios();
        setRows(response);
        // Transform data and update tableData directly
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [open]);

  useEffect(() => {
    // Fetch data when projeto.id changes
    setPassword("");
    setPasswordConfirm("");
    setUser("");
  }, [adicionando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == passwordConfirm) {
      let resp = await axios.post("http://localhost:3000/usuario", {
        email: user,
        senha: password,
      });
      const id = resp.data[0].id;
      console.log(id)

      const newUser = {
        id: id,
        email: user,
        senha: password,
      };

      setRows((state) => [...state, newUser]);
      successMessage("Usuario adicionado !");
      setPassword("");
      setPasswordConfirm("");
      setUser("");
      setAdicionando(false);
    } else {
      errorMessage("As senhas nao conferem");
    }
  };

  const deletarUsuario = React.useCallback(
    (id) => async () => {
      await axios.delete(`http://localhost:3000/usuario/${id}`);
      setTimeout(() => {
        setRows((prevData) => prevData.filter((data) => data.id !== id));
      });
    },
    []
  );

  const columns = [
    {
      field: "actions",
      type: "actions",
      width: 30,
      getActions: (params) => [
        // Disable delete action for row.id = 9
        params.id !== 9 ? (
          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={deletarUsuario(params.id)}
          />
        ) : (<></>),
      ],
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Usuário", width: 130 },
    { field: "senha", headerName: "Senha", width: 130 },
  ];

  return (
    <div>
      <MenuItem onClick={handleOpen}>Usuários</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" spacing={2} sx={{ py: 3 }}>
            <Typography id="modal-modal-title" variant="h4">
              Usuários
            </Typography>
            <Button
              variant="contained"
              onClick={() =>
                adicionando == true
                  ? setAdicionando(false)
                  : setAdicionando(true)
              }
            >
              {adicionando == true ? "Cancelar" : "Adicionar novo"}
            </Button>
          </Stack>
          {adicionando == true ? (
            <SingUp
              handleSubmit={handleSubmit}
              user={user}
              setUser={setUser}
              setPassword={setPassword}
              password={password}
              passwordConfirm={passwordConfirm}
              setPasswordConfirm={setPasswordConfirm}
            />
          ) : (
            <></>
          )}

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </Modal>
    </div>
  );
}
