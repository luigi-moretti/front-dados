import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { Container, AppBar, Toolbar } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import DataTable from './components/dataTable/DataTable';
import FormFilter from './components/formFilter/FormFilter';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import theme from './theme';


function App() {

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [parametros, setParametros] = useState({});

  function getDados(parametros) {
    axios.get(`http://localhost:3001/api/${parametros.tipoDado}/?dataInicial=${parametros.dataInicial}&dataFinal=${parametros.dataFinal}`)
      .then(res => {
        const dados = res.data;
        setRows(dados);
        const extraiCabecalho = Object.keys(dados[0]);
        setColumns(extraiCabecalho);
      })
      .catch(erro => {
        console.log(erro)
      })
  };
  useEffect(() => {
    console.log(parametros.tipoDado)
    if(parametros.tipoDado !== ''){
      getDados(parametros);
    }
  }, [parametros])

  return (
    <ThemeProvider theme={theme}>

      <Container maxWidth={false}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Gerador de Relatório</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Box m={3}>
            <FormFilter
              setParametros={setParametros}
            />
          </Box>
        </Container>
        <Container>
          <Box m={3}>
            <DataTable
              rows={rows}
              columns={columns}
            />
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
