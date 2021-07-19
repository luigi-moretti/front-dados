import React, {useEffect, useState} from 'react';
import { Container, AppBar, Toolbar} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import DataTable from './components/dataTable/DataTable.js';
import FormFilter from './components/formFilter/FormFilter';
import axios from 'axios';


function App() {

  const[rows, setRows] = useState([]);
  const[columns, setColumns] = useState([]);
  const[parametros,setParametros] = useState([]);

  function getDados(){
    axios.get('http://localhost:3001/api/mdfe/')
      .then(res=>{
        const dados = res.data;
        setRows(dados);
        const extraiCabecalho = Object.keys(dados[0]);
        const colunas = extraiCabecalho.map((item)=>{
          const dado = dados[0];
          const tamanho = dado.[item === 'id'? 'EMITENTEMDFE' : item].length;
          return{
            field: item,
            headerName: item,
            width: tamanho*13,
            editable: false,
          }
        });
        setColumns(colunas);
      })
      .catch(erro=>{
        console.log(erro)
      })
  };
  useEffect(()=>{
    getDados();
    console.log(parametros);
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
