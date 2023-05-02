import React, { Component } from 'react';
import "./FakemonForm.css"
import { TextField, Button, Select, MenuItem, FormControl, InputLabel,LinearProgress } from '@mui/material';
import { decode, encode } from "html-entities";
import api from '../utils/Api';
class FakemonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listeType: this.props.listeType,
            fakemon: this.props.fakemon,
            isLoaded: false
        };
    }

    componentDidMount() {
        api({
            method: 'GET',
            url: '/type',
            headers: {
                Authorization: "apikey " + this.props.apikey
            }
        })
            .then((resultat) => {
                this.setState({
                    listeType: resultat.data["data"],
                    isLoaded: true
                });
            })
            .catch((error) => {
                if (error.response) {
                    const dataError = error.response;
                    if (dataError.status === 401) {
                        this.props.envoyerAlerte("error", "Une erreur imprévue a survenu lors de la recherche de la liste de type.");
                    }
                    else if (dataError.status === 403) {
                        this.props.envoyerAlerte("error", "Il y a eu une erreur lors de l'envoi de la clé api lors de la recherche de la liste de type.");
                    }
                    else if (dataError.status === 500) {
                        this.props.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api lors de la recherche de la liste de type. Veuillez réessayer plus tard.");
                    }
                }
            })
    }

    changementNom = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["nom"] = encode(e.target.value, { mode: 'specialChars', level: 'html5' });
        this.setState({
            fakemon: fakemon
        });
    }

    changementDescription = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["description"] = encode(e.target.value, { mode: 'specialChars', level: 'html5' });
        this.setState({
            fakemon: fakemon
        });
    }

    changementType1 = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["id_type1"] = parseInt(e.target.value);
        this.setState({
            fakemon: fakemon
        });
    }

    changementType2 = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["id_type2"] = parseInt(e.target.value);
        this.setState({
            fakemon: fakemon
        });
    }

    changementAtk = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["atk"] = parseInt(e.target.value);
        this.setState({
            fakemon: fakemon
        });
    }

    changementSpAtk = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["sp_atk"] = parseInt(e.target.value)
        this.setState({
            fakemon: fakemon
        });
    }

    changementDef = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["def"] = parseInt(e.target.value);
        this.setState({
            fakemon: fakemon
        });
    }

    changementSpDef = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["sp_def"] = parseInt(e.target.value);
        this.setState({
            fakemon: fakemon
        });
    }

    changementHp = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["hp"] = parseInt(e.target.value);
        this.setState({
            fakemon: fakemon
        });
    }

    changementSpeed = (e) => {
        let fakemon = this.state.fakemon;
        fakemon["speed"] = parseInt(e.target.value);
        this.setState({
            fakemon: fakemon
        });
    }

    ajoutFakemon = (e) => {
        e.preventDefault();
        this.setState({
            isLoaded:false
        });
        api({
            method: 'POST',
            url: '/fakemon',
            headers: {
                Authorization: "apikey " + this.props.apikey
            },
            data: {
                "nom": this.state.fakemon["nom"],
                "id_type1": this.state.fakemon["id_type1"],
                "id_type2": this.state.fakemon["id_type2"],
                "hp": this.state.fakemon["hp"],
                "atk": this.state.fakemon["atk"],
                "def": this.state.fakemon["def"],
                "sp_atk": this.state.fakemon["sp_atk"],
                "sp_def": this.state.fakemon["sp_def"],
                "speed": this.state.fakemon["speed"],
                "description": this.state.fakemon["description"]
            }
        })
            .then((resultat) => {
                this.setState({
                    fakemon: resultat.data["data"],
                    isLoaded: true
                });
                this.props.envoyerAlerte("success", "L'ajout du fakemon a été réussi.");
                this.props.ajoutFakemon(resultat.data["data"])
            })
            .catch((error) => {
                if (error.response) {
                    const dataError = error.response;
                    if (dataError.status === 401) {
                        this.props.envoyerAlerte("error", "Une erreur imprévue a survenu lors de l'ajout du fakemon.");
                    }
                    else if (dataError.status === 403) {
                        this.props.envoyerAlerte("error", "Il y a eu une erreur lors de l'envoi de la clé api lors de l'ajout du fakemon.");
                    }
                    else if (dataError.status === 500) {
                        this.props.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api lors de l'ajout du fakemon. Veuillez réessayer plus tard.");
                    }
                }
            })
    }

    resetForm = (e) => {
        e.preventDefault();
        this.setState({
            fakemon: {
                "id": 0,
                "nom": " ",
                "id_type1": 1,
                "id_type2": 1,
                "hp": 0,
                "atk": 0,
                "def": 0,
                "sp_atk": 0,
                "sp_def": 0,
                "speed": 0,
                "description": " ",
                "id_usager": 0
            }
        });
    }

    render() {
        if (this.state.isLoaded) {
            let listeSelect = [];
            for (let index = 0; index < this.state.listeType.length; index++) {
                let type = <MenuItem value={this.state.listeType[index]["id"]} key={index}>{this.state.listeType[index]["nom"]}</MenuItem>
                listeSelect = [...listeSelect, type];
            }
            return (
                <div>
                    <form id='formFakemon'>
                        <h2 id='titreForm'>Information du fakemon:</h2>

                        <TextField value={decode(this.state.fakemon["nom"], { level: 'html5' })} onChange={this.changementNom} id="formNomFakemon" label="Nom" variant="filled" size='large' className='nomFakemon' helperText="La limite de caractères est de 100" inputProps={{ maxLength: 100 }} />

                        <br></br>

                        <FormControl variant='filled' className='type'>
                            <InputLabel id="labelType1">Type 1</InputLabel>
                            <Select
                                labelId="labelType1"
                                id="type1"
                                label="type1"
                                value={this.state.fakemon["id_type1"]}
                                onChange={this.changementType1}
                            >
                                {listeSelect}
                            </Select>
                        </FormControl>

                        <FormControl variant='filled' className='type'>
                            <InputLabel id="labelType2">Type 2</InputLabel>
                            <Select
                                labelId="labelType2"
                                id="type2"
                                label="type2"
                                value={this.state.fakemon["id_type2"]}
                                onChange={this.changementType2}
                            >
                                {listeSelect}
                            </Select>
                        </FormControl>

                        <br></br>

                        <TextField
                            id="hpInfo"
                            label="Hp"
                            type="number"
                            value={this.state.fakemon["hp"]}
                            onChange={this.changementHp}
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
                            onChange={this.changementSpeed}
                            value={this.state.fakemon["speed"]}
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
                            onChange={this.changementAtk}
                            value={this.state.fakemon["atk"]}
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
                            onChange={this.changementSpAtk}
                            value={this.state.fakemon["sp_atk"]}
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
                            onChange={this.changementDef}
                            value={this.state.fakemon["def"]}
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
                            onChange={this.changementSpDef}
                            value={this.state.fakemon["sp_def"]}
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
                            onChange={this.changementDescription}
                            value={decode(this.state.fakemon["description"], { level: 'html5' })}
                        />

                        <Button variant="contained" size='medium' type='submit' className='boutonFormFakemon'>Mise à jour</Button>
                        <Button variant="contained" size='medium' type='submit' className='boutonFormFakemon' onClick={this.ajoutFakemon}>Ajouter</Button>
                        <Button variant="contained" size='medium' type='submit' className='boutonFormFakemon' onClick={this.resetForm}>Recommencer</Button>
                        <Button variant="contained" size='medium' type='submit' className='boutonFormFakemon'>Supprimer</Button>
                    </form>
                </div>
            );
        }
        else {
            return (
                <div>
                <form id='formFakemon'>

                    <h2 id='titreForm'>Information du fakemon:</h2>
                    <LinearProgress variant="indeterminate" />
                </form>
            </div>
            );
        }

    }
}

export default FakemonForm;
