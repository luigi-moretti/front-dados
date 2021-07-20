import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import DataTable from './components/dataTable/DataTable';
import FormFilter from './components/formFilter/FormFilter';
import axios from 'axios';


function App() {

  const[rows, setRows] = useState([]);
  const[columns, setColumns] = useState([]);
  const[parametros,setParametros] = useState({});

  function getDados(parametros){
    axios.get(`http://localhost:3001/api/mdfe/?dataInicial=${parametros.dataInicial}&dataFinal=${parametros.dataFinal}`)
      .then(res=>{
        const dados = res.data;
        setRows(dados);
        const extraiCabecalho = Object.keys(dados[0]);
        setColumns(extraiCabecalho);
      })
      .catch(erro=>{
        console.log(erro)
      })
  };
  useEffect(()=>{
    getDados(parametros);
  },[parametros])

  return (
   <Container maxWidth="false">
     <AppBar position="static">
       <Toolbar>
         <Typography variant="h6">Gerador de Relatórios</Typography>
       </Toolbar>
     </AppBar>
     <Container>
       <FormFilter
        setParametros = {setParametros}
       />
     </Container>
     <Container>
     <DataTable
      rows={rows}
      columns={columns}
     />
     </Container>
   </Container>
  );
}

export default App;
