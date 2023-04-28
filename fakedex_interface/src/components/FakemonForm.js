import React, { Component } from 'react';
import "./FakemonForm.css"
import { TextField, colors, List, Grid, Button, Paper, LinearProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

class FakemonForm extends Component {
    render() {
        return (
            <div>
                <form id='formFakemon'>
                    <h2 id='titreForm'>Information du fakemon:</h2>

                    <TextField id="formNomFakemon" label="Nom" variant="filled" size='large' className='nomFakemon' helperText="La limite de caractères est de 100" inputProps={{ maxLength: 100 }}/>

                    <br></br>

                    <FormControl variant='filled' className='type'>
                        <InputLabel id="labelType1">Type 1</InputLabel>
                        <Select
                            labelId="labelType1"
                            id="type1"
                            label="type1"
                            defaultValue={10}
                        >
                            <MenuItem value={10}>Aucun</MenuItem>
                            <MenuItem value={20}>Normal</MenuItem>
                            <MenuItem value={30}>Feu</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant='filled' className='type'>
                        <InputLabel id="labelType2">Type 2</InputLabel>
                        <Select
                            labelId="labelType2"
                            id="type2"
                            label="type2"
                            defaultValue={10}
                        >
                            <MenuItem value={10}>Aucun</MenuItem>
                            <MenuItem value={20}>Normal</MenuItem>
                            <MenuItem value={30}>Feu</MenuItem>
                        </Select>
                    </FormControl>

                    <br></br>

                    <TextField
                        id="hpInfo"
                        label="Hp"
                        type="number"
                        defaultValue={0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 2147483647
                        }}
                        className='stats stats-debut'
                        variant="filled"
                    />

                    <TextField
                        id="vitesseInfo"
                        label="Vitesse"
                        type="number"
                        defaultValue={0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 2147483647
                        }}
                        className='stats stats-debut'
                        variant="filled"
                    />

                    <br></br>

                    <TextField
                        id="atkInfo"
                        label="Atk"
                        type="number"
                        defaultValue={0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 2147483647
                        }}
                        className='stats'
                        variant="filled"
                    />

                    <TextField
                        id="spAtkInfo"
                        label="Sp.Atk"
                        type="number"
                        defaultValue={0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 2147483647
                        }}
                        className='stats'
                        variant="filled"
                    />

                    <br></br>

                    <TextField
                        id="defInfo"
                        label="Def"
                        type="number"
                        defaultValue={0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 2147483647
                        }}
                        className='stats stats-fin'
                        variant="filled"
                    />

                    <TextField
                        id="spdDefInfo"
                        label="Sp.Def"
                        type="number"
                        defaultValue={0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 2147483647
                        }}
                        className='stats stats-fin'
                        variant="filled"
                    />

                    <br></br>

                    <TextField
                        id="descriptionInfo"
                        label="Description"
                        multiline
                        rows={5}
                        fullWidth={true}
                        placeholder='Écrivez votre description du fakemon ici.'
                        helperText="Nombre de caractères maximal est de 500"
                        inputProps={{ maxLength: 500 }}
                        className='descrip'
                        variant="filled"
                    />

                    <Button variant="contained" size='medium' type='submit' className='boutonFormFakemon'>Mise à jour</Button>
                    <Button variant="contained" size='medium' type='submit'className='boutonFormFakemon'>Ajouter</Button>
                    <Button variant="contained" size='medium' type='submit' className='boutonFormFakemon'>Recommencer</Button>

                </form>
            </div>
        );
    }
}

export default FakemonForm;
