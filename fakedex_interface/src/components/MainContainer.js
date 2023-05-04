import React, { Component } from 'react';
import { Paper, Grid, Alert, Collapse, IconButton, CircularProgress } from '@mui/material';
import LoginForm from './LoginForm';
import ListeFakemon from './ListeFakemon';
import FakemonForm from './FakemonForm';
import { Close } from '@mui/icons-material';
import "./MainContainer.css";
import api from '../utils/Api';

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apikey: "Elle va être ici",
            isLoaded: false,
            etatAlerte: false,
            typeAlerte: "error",
            messageAlerte: "Test",
            listeFakemon: [],
            fakemonSelection: {
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
            },
            listeType: {
                "id": 1,
                "nom": "Aucun"
            },
            typeCharger: false
        };
        this.fermerAlerte = this.fermerAlerte.bind(this);
        this.envoyerAlerte = this.envoyerAlerte.bind(this);
        this.changerApiKey = this.changerApiKey.bind(this);
        this.chercherListeFakemon = this.chercherListeFakemon.bind(this);
        this.rechargementCle = this.rechargementCle.bind(this);
        this.miseAjourSelection = this.miseAjourSelection.bind(this);
    }

    miseAjourSelection(fakemonVar) {
        let fakemon = fakemonVar;
        this.setState({
            fakemonSelection: fakemon,
            isLoaded: false,
            typeCharger: false
        });
        api({
            method: 'GET',
            url: '/type',
            headers: {
                Authorization: "apikey " + this.state.apikey
            }
        })
            .then((resultat) => {
                this.setState({
                    isLoaded: true,
                    listeType: resultat.data["data"],
                    typeCharger: true
                });
                this.envoyerAlerte("success", "Vous pouvez éditez le fakemon maintenant.");
            })
            .catch((error) => {
                if (error.response) {
                    const dataError = error.response;
                    if (dataError.status === 401) {
                        this.envoyerAlerte("error", "Une erreur imprévue a survenu lors de la recherche de la liste de type.");
                    }
                    else if (dataError.status === 403) {
                        this.envoyerAlerte("error", "Il y a eu une erreur lors de l'envoi de la clé api lors de la recherche de la liste de type.");
                    }
                    else if (dataError.status === 500) {
                        this.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api lors de la recherche de la liste de type. Veuillez réessayer plus tard.");
                    }
                }
            })
    }

    rechargementCle() {
        this.setState({
            isLoaded: false
        });
    }

    fermerAlerte(e) {
        this.setState({
            etatAlerte: false
        });
    }

    envoyerAlerte(typeAlerte, messageAlerte) {
        this.setState({
            etatAlerte: true,
            typeAlerte: typeAlerte,
            messageAlerte: messageAlerte
        });
    }

    changerApiKey(apiKey) {
        this.setState({
            apikey: apiKey,
            isLoaded: true,
            fakemonSelection: {
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

    chercherListeFakemon(listeFakemon) {
        this.setState({
            listeFakemon: listeFakemon,
            typeCharger: false
        });
    }

    ajoutFakemon = (fakemonNouv) => {
        this.setState({
            isLoaded: false
        });
        api({
            method: 'POST',
            url: '/fakemon',
            headers: {
                Authorization: "apikey " + this.state.apikey
            },
            data: {
                "nom": fakemonNouv["nom"],
                "id_type1": fakemonNouv["id_type1"],
                "id_type2": fakemonNouv["id_type2"],
                "hp": fakemonNouv["hp"],
                "atk": fakemonNouv["atk"],
                "def": fakemonNouv["def"],
                "sp_atk": fakemonNouv["sp_atk"],
                "sp_def": fakemonNouv["sp_def"],
                "speed": fakemonNouv["speed"],
                "description": fakemonNouv["description"]
            }
        })
            .then((resultat) => {
                let listeFakemon = this.state.listeFakemon;
                listeFakemon = [...listeFakemon, fakemonNouv];
                this.setState({
                    listeFakemon: listeFakemon,
                    isLoaded: true,
                    fakemonSelection: fakemonNouv,
                });
                this.envoyerAlerte("success", "L'ajout du fakemon a été réussi.");

            })
            .catch((error) => {
                if (error.response) {
                    const dataError = error.response;
                    if (dataError.status === 401) {
                        this.envoyerAlerte("error", "Une erreur imprévue a survenu lors de l'ajout du fakemon.");
                    }
                    else if (dataError.status === 403) {
                        this.envoyerAlerte("error", "Il y a eu une erreur lors de l'envoi de la clé api lors de l'ajout du fakemon.");
                    }
                    else if (dataError.status === 500) {
                        this.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api lors de l'ajout du fakemon. Veuillez réessayer plus tard.");
                    }
                }
            })

    }

    modifierFakemon = (fakemon) => {
        this.setState({
            isLoaded: false
        });
        api({
            method: 'PUT',
            url: '/fakemon/' + fakemon["id"],
            headers: {
                Authorization: "apikey " + this.state.apikey
            },
            data: {
                "nom": fakemon["nom"],
                "id_type1": fakemon["id_type1"],
                "id_type2": fakemon["id_type2"],
                "hp": fakemon["hp"],
                "atk": fakemon["atk"],
                "def": fakemon["def"],
                "sp_atk": fakemon["sp_atk"],
                "sp_def": fakemon["sp_def"],
                "speed": fakemon["speed"],
                "description": fakemon["description"]
            }
        })
            .then((resultat) => {
                let listeFakemon = this.state.listeFakemon;
                for (let index = 0; index < listeFakemon.length; index++) {
                    if (listeFakemon[index]["id"] === fakemon["id"]) {
                        listeFakemon[index] = fakemon;
                    }
                }
                this.setState({
                    listeFakemon: listeFakemon,
                    isLoaded: true,
                    fakemonSelection: resultat.data,
                });
                this.envoyerAlerte("success", "La modification du fakemon a été réussi.");
            })
            .catch((error) => {
                if (error.response) {
                    const dataError = error.response;
                    if (dataError.status === 401) {
                        this.envoyerAlerte("error", "Une erreur imprévue a survenu lors de la modification du fakemon.");
                    }
                    else if (dataError.status === 403) {
                        this.envoyerAlerte("error", "Il y a eu une erreur lors de l'envoi de la clé api lors de la modification du fakemon.");
                    }
                    else if (dataError.status === 500) {
                        this.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api lors de la modification du fakemon. Veuillez réessayer plus tard.");
                    }
                }
            })

    }

    supprimerFakemon = (fakemon) => {
        let existe = false;
        for (let index = 0; index < this.state.listeFakemon.length; index++) {
            if (this.state.listeFakemon[index]["id"] === fakemon["id"]) {
                existe = true;
            }
        }
        if (existe) {
            this.setState({
                isLoaded: false
            });
            api({
                method: 'DELETE',
                url: '/fakemon/' + fakemon["id"],
                headers: {
                    Authorization: "apikey " + this.state.apikey
                }
            })
                .then((resultat) => {
                    let listeFakemon = [];
                    for (let index = 0; index < this.state.listeFakemon.length; index++) {
                        if (this.state.listeFakemon[index]["id"] !== fakemon["id"]) {
                            listeFakemon = [...listeFakemon, this.state.listeFakemon[index]];
                        }
                    }
                    this.setState({
                        listeFakemon: listeFakemon,
                        isLoaded: true,
                        fakemonSelection: {
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
                    this.envoyerAlerte("success", "La supression du fakemon a été réussi.");
                })
                .catch((error) => {
                    if (error.response) {
                        const dataError = error.response;
                        if (dataError.status === 401) {
                            this.envoyerAlerte("error", "Une erreur imprévue a survenu lors de la suppression du fakemon.");
                        }
                        else if (dataError.status === 403) {
                            this.envoyerAlerte("error", "Il y a eu une erreur lors de l'envoi de la clé api lors de la suppression du fakemon.");
                        }
                        else if (dataError.status === 500) {
                            this.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api lors de la suppression du fakemon. Veuillez réessayer plus tard.");
                        }
                    }
                })
        }
        else {
            this.envoyerAlerte("warning", "Le fakemon n'existe pas dans votre liste.");
        }


    }

    render() {
        let formulaireFakemon = [<CircularProgress key={0}/>];
        let listeFakemon = [<CircularProgress key={0}/>];
        if (this.state.isLoaded) {
            formulaireFakemon = [<FakemonForm key={1} ajoutFakemon={this.ajoutFakemon} supprimerFakemon={this.supprimerFakemon} modifierFakemon={this.modifierFakemon} fakemon={this.state.fakemonSelection} cleCharger={this.state.typeCharger} listeType={this.state.listeType} envoyerAlerte={this.envoyerAlerte} apikey={this.state.apikey} />];
            listeFakemon = [<ListeFakemon key={1} cleCharger={this.state.isLoaded} chercherListeFakemon={this.chercherListeFakemon} listeFakemon={this.state.listeFakemon} envoyerAlerte={this.envoyerAlerte} apikey={this.state.apikey} miseAjourSelection={this.miseAjourSelection} />]
        }
        else {
            formulaireFakemon = [<CircularProgress key={0}/>];
            listeFakemon = [<CircularProgress key={0}/>];
        }
        return (
            <div id="container">
                <Collapse in={this.state.etatAlerte}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    this.fermerAlerte();
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        severity={this.state.typeAlerte}
                    >
                        {this.state.messageAlerte}
                    </Alert>
                </Collapse>
                <Grid container columnSpacing={2} >
                    <Grid xs={5} rowSpacing={2} item>
                        <Paper elevation={10} className={"formContainer"}>
                            <LoginForm apikey={this.state.apikey} changerApiKey={this.changerApiKey} envoyerAlerte={this.envoyerAlerte} nouvCle={this.rechargementCle} />
                        </Paper>
                        <Paper elevation={10} className={"listContainer"}>
                            {listeFakemon}
                        </Paper>
                    </Grid>
                    <Grid xs={6} item >
                        <Paper elevation={10} className={"formFakemonContainer"}>
                            {formulaireFakemon}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MainContainer;
