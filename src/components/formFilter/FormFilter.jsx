import React, { useState } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function FormFilter({setParametros}) {
    const [dataInicial, setDataInicial] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [dataFinal, setDataFinal] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

    const handleSubmit = (dataInicial, dataFinal)=>{
        let dados = [dataInicial, dataFinal]
        console.log(dados);
        setParametros(dados);
    }

    return (
        <form onSubmit={(evento)=>{
            evento.preventDefault();
            handleSubmit(dataInicial, dataFinal);
        }}>
            <Typography variant="h4">Formulário de Filtro de Dados</Typography>
            <Typography>Selecione as datas iniciais e finais de Autorização</Typography>

            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    label="Data Inicial"
                    value={dataInicial}
                    onChange={(evento)=>{
                        setDataInicial(moment(evento._d).format('YYYY-MM-DD HH:mm:ss'));
                    }}
                    onError={console.log}
                    disableFuture
                    format="DD/MM/YYYY HH:mm"
                    invalidDateMessage='Formato inválido de data'
                    maxDateMessage='A data não pode ser maior que a data atual'
                    minDateMessage='A data não pode ser menor que o mínimo permitido'
                />

                <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    label="Data Inicial"
                    value={dataFinal}
                    onChange={(evento)=>{
                            setDataFinal(moment(evento._d).format('YYYY-MM-DD HH:mm:ss'));
                        }
                    }
                    onError={console.log}
                    disableFuture
                    format="DD/MM/YYYY HH:mm"
                    invalidDateMessage='Formato inválido de data'
                    maxDateMessage='A data não pode ser maior que a data atual'
                    minDateMessage='A data não pode ser menor que o mínimo permitido'
                />

            </MuiPickersUtilsProvider>
            <Button type="submit" variant="contained" color="primary">Filtrar</Button>
        </form>
    );
}

export default FormFilter;