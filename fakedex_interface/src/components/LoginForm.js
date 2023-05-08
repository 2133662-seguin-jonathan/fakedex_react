import React, { Component } from 'react';
import "./LoginForm.css";
import { TextField, Grid, Button, Paper, LinearProgress } from '@mui/material';
import api from "../utils/Api"
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apikey: this.props.apikey,
            isLoaded: false,
            username: "",
            password: "",
            progressBar: <LinearProgress variant="determinate" value={0} />
        };
        this.changerProgressbar = this.changerProgressbar.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.nouvApikey = this.nouvApikey.bind(this);
        this.connecterUtilisateur = this.connecterUtilisateur.bind(this);
    }

    connecterUtilisateur(e) {
        e.preventDefault();
        this.props.nouvCle();

        this.setState({
            isLoaded: false,
            apikey: "En attente"
        });
        this.changerProgressbar(true);
        let tokenEncoder = btoa(this.state.username + " " + this.state.password);
        api({
            method: 'get',
            url: '/apikey',
            headers: {
                Authorization: "account " + tokenEncoder,
            }
        })
            .then((resultat) => {
                this.setState({
                    isLoaded: true,
                    apikey: resultat.data["api_key"]
                });
                this.props.changerApiKey(resultat.data["api_key"]);
                this.props.envoyerAlerte("success", "La connection a été un succès.");
                this.changerProgressbar(false);
            })
            .catch((error) => {
                this.changerProgressbar(false);
                if (error.response) {
                    const dataError = error.response;
                    if (dataError.status === 401) {
                        this.props.envoyerAlerte("error", "Une erreur imprévue a survenu lors de la recherche de la clé d'api. Veuillez en informer le propriétaire.");
                    }
                    else if (dataError.status === 403) {
                        this.props.envoyerAlerte("warning", "Les informations envoyés sont erronées. Veuillez retester en vous assurant que l'username er le password coïncide au compte.");
                    }
                    else if (dataError.status === 500) {
                        this.props.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api. Veuillez réessayer plus tard.");
                    }
                }
            })
    }

    nouvApikey(e) {
        e.preventDefault();
        this.props.nouvCle();

        this.setState({
            isLoaded: false,
            apikey: "En attente"
        });
        this.changerProgressbar(true);
        let tokenEncoder = btoa(this.state.username + " " + this.state.password);
        api({
            method: 'GET',
            url: '/apikey?nouvelle=1',
            headers: {
                Authorization: "account " + tokenEncoder
            }
        })
            .then((resultat) => {
                this.setState({
                    isLoaded: true,
                    apikey: resultat.data["api_key"]
                });
                this.props.changerApiKey(resultat.data["api_key"]);
                this.props.envoyerAlerte("success", "La génération d'une nouvelle clé a été un succès.");
                this.changerProgressbar(false);
            })
            .catch((error) => {
                this.changerProgressbar(false);
                if (error.response) {
                    const dataError = error.response;
                    if (dataError.status === 401) {
                        this.props.envoyerAlerte("error", "Une erreur imprévue a survenu lors de la recherche de la clé d'api. Veuillez en informer le propriétaire.");
                    }
                    else if (dataError.status === 403) {
                        this.props.envoyerAlerte("warning", "Les informations envoyés sont erronées. Veuillez retester en vous assurant que l'username er le password coïncide au compte.");
                    }
                    else if (dataError.status === 500) {
                        this.props.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api. Veuillez réessayer plus tard.");
                    }
                }
            })
    }

    setUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    setPassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    changerProgressbar(etat) {
        if (etat) {
            this.setState({
                progressBar: <LinearProgress variant="indeterminate" />
            });
        }
        else {
            this.setState({
                progressBar: <LinearProgress variant="determinate" value={0} />
            });
        }
    }

    render() {
        return (
            <div>
                <form id='formLogin'>
                    <h2 id='titreForm'>Connection à l'api</h2>


                    <TextField id="formUsername" label="Username" variant="filled" className='usagerInfo'
                        helperText="Nombre de caractères maximum est de 200" inputProps={{ maxLength: 200 }} value={this.state.username}
                        onChange={this.setUsername} />

                    <TextField id="formPassword" type='password' label="Password" variant="filled" className='usagerInfo' helperText="Le mot de passe"
                        value={this.state.password} onChange={this.setPassword} />

                    <Grid container columnSpacing={2} id={"boutonForm"}>
                        <Grid xs={5} item>
                            <Button variant="contained" size='medium' type='submit' onClick={this.connecterUtilisateur}>Connecter</Button>
                        </Grid>
                        <Grid xs={5} item>
                            <Button variant="contained" size='medium' type='submit' onClick={this.nouvApikey}>Nouvelle clé</Button>
                        </Grid>
                    </Grid>

                    <Paper elevation={10} className='infoCle'>
                        <h2 id='titreCle'>Clé: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <p className='cle'>{this.state.apikey}</p></h2>
                        {this.state.progressBar}
                    </Paper>




                </form>
            </div>
        );
    }
}

export default LoginForm;
