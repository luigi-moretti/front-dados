import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    labelRowsPerPage:'Linhas por páginas',
    selectLabel:'Linha selecionada',
  },
  selectLabel:{},
});



export default function DataTable({ rows, columns }) {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(5);

  const handleMudaPadeSize = (parametros) => {
    setPageSize(parametros.pageSize);
  }

  return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          onPageSizeChange={handleMudaPadeSize}
          rowsPerPageOptions={[5, 10, 20]}
          cclasses={classes} // {...restProps}
        />
      </div>
  );
}
