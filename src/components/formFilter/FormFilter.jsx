import React, { useState } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

function FormFilter({ setParametros }) {
    const [dataInicial, setDataInicial] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [dataFinal, setDataFinal] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [tipoDado, setTipoDado] = useState('CTE');
    const [status, setStatus] = useState([]);
    const [chaves, setChaves] = useState('');

    const statusBase = ['CANCELADO', 'AUTORIZADO'];

    const tipoDadoBase = ['CTE','MDFE']

    const handleSubmit = (tipoDado, dataInicial, dataFinal, status, chaves) => {
        setParametros({
            tipoDado: tipoDado,
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            status:status,
            chaves:chaves
        });
    }

    const handleChangeTipoDado = (event) => {
        setTipoDado(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleChangeChave = (event) =>{
        setChaves(event.target.value)
    }

    return (
        <form onSubmit={(evento) => {
            evento.preventDefault();
            handleSubmit(tipoDado, dataInicial, dataFinal, status, chaves);
        }}>
            <Typography variant="h4">Relatório de CTe ou MDFe</Typography>
            <Typography variant="h6">Formulário de Filtro de Dados</Typography>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Grid item sm={4} xs={12}>
                        <Typography>Selecione o tipo de dado que deseja</Typography>
                    </Grid>
                    <Grid item sm={3} xs={12}  >
                        <FormControl fullWidth>
                            <InputLabel id="tipo-de-dado-label">Tipo de dado</InputLabel>
                            <Select
                                labelId="tipo-de-dado-label"
                                id="tipo-de-dado"
                                value={tipoDado}
                                onChange={handleChangeTipoDado}
                                displayEmpty
                                required
                            >
                                {tipoDadoBase.map((item)=>{return(
                                    <MenuItem value={item}>{item}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Grid item sm={4} xs={12}>
                        <Typography>Selecione o status do dado que deseja</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}  >
                        <FormControl fullWidth>
                            <InputLabel id="tipo-status-label">Status</InputLabel>
                            <Select
                                labelId="tipo-status-label"
                                id="status"
                                multiple
                                value={status}
                                onChange={handleChangeStatus}
                                input={<Input id="select-status" />}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </div>
                                )}
                            >
                                {statusBase.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Grid item sm={4} xs={12}>
                        <Typography>Selecione as chaves que deseja</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}  >
                        <FormControl fullWidth>
                            <TextField
                                variant="standard"
                                label="Chave CTe ou MDFe"
                                placeholder="Insira as chaves separadas por ponto e vírgula"
                                multiline
                                rows={4}
                                rowsMax={8}
                                onChange={handleChangeChave}
                                value={chaves}
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Grid item sm={4} xs={12}>
                        <Typography>Selecione as datas iniciais e finais de Autorização</Typography>
                    </Grid>

                    <Grid item sm={3} xs={12}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDateTimePicker
                                variant="inline"
                                ampm={false}
                                label="Data Inicial"
                                value={dataInicial}
                                onChange={(evento) => {
                                    setDataInicial(moment(evento._d).format('YYYY-MM-DD HH:mm:ss'));
                                }}
                                onError={console.log}
                                disableFuture
                                format="DD/MM/YYYY HH:mm"
                                invalidDateMessage='Formato inválido de data'
                                maxDateMessage='A data não pode ser maior que a data atual'
                                minDateMessage='A data não pode ser menor que o mínimo permitido'
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item sm={3} xs={12}>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDateTimePicker
                                variant="inline"
                                ampm={false}
                                label="Data Final"
                                value={dataFinal}
                                onChange={(evento) => {
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
                    </Grid>
                </Grid>

            </Grid>
            <Button type="submit" variant="contained" color="primary">Filtrar</Button>
        </form>
    );
}

export default FormFilter;