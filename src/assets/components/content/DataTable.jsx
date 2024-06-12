

import React, { useCallback, useEffect, useRef, useState } from "react";
import { DataGrid, GridActionsCellItem, GridCellEditStopReasons, GridRowEditStopReasons } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/base";
import { Typography } from "@mui/material";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { successMessage, errorMessage } from "./toast/toast";
import dayjs from "dayjs";

// API call
// const pegarMovimentacoes = async (projeto) => {
//   const res = await axios.get(
//     `http://localhost:3000/projeto/${projeto.id}/movimentacoes`
//   );
//   return res.data;
// };

// Helper function for currency formatting
const ccyFormat = (num, isEntrada) => {
  if (isEntrada == true) {
    return `+R$ ${num.toFixed(2)}`;
  } else if (isEntrada == false) {
    return `-R$ ${num.toFixed(2)}`;
  } else {
    return `R$ ${num.toFixed(2)}`;
  }
};

export const DataTable = ({ projeto, movimentacao, setMovimentacao, isLoading }) => {
  const [tableData, setTableData] = useState([]);
  const [x, setx] = useState('')
   // Add loading state

  const columns = [
    {
      field: "actions",
      type: "actions",
      width: 30,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deletarMovimentacao(params.id)}
        />,
      ],
    },
    {
      field: "dataMovimento",
      headerName: "Data",
      editable: false,
      width: 130,
      renderCell: (params) =>
        moment(params.row.dataMovimento).format("DD-MM-YYYY"),
    },
    { field: "historico", headerName: "Historico", editable: true },
    { field: "documento", headerName: "Documento", width: 130, editable: true },
    {
      field: "fornecedor",
      headerName: "Fornecedor",
      width: 130,
      editable: true,
    },

    {
      field: "notaFiscal",
      headerName: "Nota Fiscal",
      width: 130,
      editable: false,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      type: "singleSelect",
      valueOptions: [
        { value: 1, label: "Entrada" },
        { value: 0, label: "Saída" },
      ],
      editable: false,
      width: 130,
      renderCell: (params) => <>{!params.row.tipo ? `Saída` : `Entrada`}</>,
    },
    {
      field: "valor",
      headerName: "Valor",
      width: 130,
      editable: false,
      renderCell: (params) => <>{`R$ ${params.row.valor.toFixed(2)}`}</>,
      type: "number",
    },
    {
      field: "saldo",
      headerName: "Saldo",
      width: 130,
      renderCell: (params) => <>{`R$ ${params.row.saldo.toFixed(2)}`}</>,
      type: "number",
    },
  ];
  

  const handleChange = (updatedRow,originalRow) =>{
    if(originalRow == updatedRow){
      return originalRow
    } else {
      const id = updatedRow.id
      movimentacao.map(async (element) => {
        if(element.id == id){
          let dataFormatada = moment(element.dataMovimento).format('YYYY-MM-DD')
          await axios.put(`http://localhost:3000/projeto/${element.projetoId}/movimentacoes/${element.id}`,{"valor":updatedRow.valor,'dataMovimento':dataFormatada,'notaFiscal':updatedRow.notaFiscal,'fornecedor':updatedRow.fornecedor,'documento':updatedRow.documento,'historico':updatedRow.historico,'isEntrada':element.isEntrada})
          successMessage('valor atualizado')
        }
      })
      
      return updatedRow
      
    }
   
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await pegarMovimentacoes(projeto);
  //       setMovimentacao(response)
  //       const transformedData = movimentacao.map((element) => ({
  //         id: element.id,
  //         historico: element.historico,
  //         dataMovimento: element.dataMovimento,
  //         documento: element.documento,
  //         valor: +element.valor,
  //         tipo: element.isEntrada,
  //         saldo: +element.saldo,
  //         fornecedor: element.fornecedor,
  //         notaFiscal: element.notaFiscal,
  //       }));
  //       setTableData(transformedData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [projeto.id]);

  useEffect(() => {
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
    setTableData(transformedData)
  },[movimentacao])

  

    

  const deletarMovimentacao = useCallback(
    (id) => async () => {
      await axios.delete(
        `http://localhost:3000/projeto/${projeto.id}/movimentacoes/${id}`
      );
      setTimeout(() => {
        setTableData((prevData) => prevData.filter((data) => data.id !== id));
        setMovimentacao((prevData) => prevData.filter((data) => data.id !== id))
      });
    },
    []
  );


  useRef(() => {
    console.log('mudou')
  },[tableData])

  return (
    <>
      {isLoading ? (
        <Typography>Carregando...</Typography>
      ) : tableData.length > 0 ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            sx={{ boxShadow: 10, width: { xs: "70%", sm: "100%" } }}
            pageSizeOptions={[5, 10]}
            processRowUpdate={(updatedRow, originalRow) =>
              handleChange(updatedRow, originalRow)
            }
          />
        </div>
      ) : (
        <Typography variant="h6" sx={{ pt: 2, alignItems: "center" }}>
          Este projeto ainda não possui nenhuma movimentação...
        </Typography>
      )}
    </>
  );
};
