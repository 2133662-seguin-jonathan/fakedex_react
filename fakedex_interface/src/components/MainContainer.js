import React, { Component } from 'react';
import { Paper, Grid, Alert, Collapse, IconButton } from '@mui/material';
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
            isLoaded:false,
            etatAlerte: false,
            typeAlerte:"error",
            messageAlerte:"Test",
            listeFakemon:[],
            fakemonSelection:{
                "id":0,
                "nom":" ",
                "id_type1":1,
                "id_type2":1,
                "hp":0,
                "atk":0,
                "def":0,
                "sp_atk":0,
                "sp_def":0,
                "speed":0,
                "description":" ",
                "id_usager": 0
            },
            listeType: {
                "id":1,
                "nom":"Aucun"
            },
            typeCharger:false
        };
        this.fermerAlerte = this.fermerAlerte.bind(this);
        this.envoyerAlerte = this.envoyerAlerte.bind(this);
        this.changerApiKey = this.changerApiKey.bind(this);
        this.chercherListeFakemon = this.chercherListeFakemon.bind(this);
        this.rechargementCle = this.rechargementCle.bind(this);
        this.miseAjourSelection = this.miseAjourSelection.bind(this);
    }

    miseAjourSelection(fakemonVar){
        let fakemon = fakemonVar;
        this.setState({
            fakemonSelection: fakemon,
            isLoaded:false,
            typeCharger:false
        });
        api({
            method: 'GET',
            url: '/type',
            headers: {
                Authorization: "apikey "+this.state.apikey
            }
        })
            .then((resultat) => {
                this.setState({
                    isLoaded: true,
                    listeType: resultat.data["data"],
                    typeCharger:true
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
            fakemonSelection:{
                "id":0,
                "nom":" ",
                "id_type1":1,
                "id_type2":1,
                "hp":0,
                "atk":0,
                "def":0,
                "sp_atk":0,
                "sp_def":0,
                "speed":0,
                "description":" ",
                "id_usager": 0
            }
        });
    }

    chercherListeFakemon(listeFakemon) {
        this.setState({
            listeFakemon: listeFakemon,
            typeCharger:false
        });
    }

    ajoutFakemon = (fakemonNouv) => {
        this.setState({
            isLoaded: false
        });
        let listeFakemon = this.state.listeFakemon;
        listeFakemon = [...listeFakemon, fakemonNouv];
        this.setState({
            listeFakemon: listeFakemon,
            isLoaded: true,
            fakemonSelection: fakemonNouv,
        });
    }

    render() {
        let formulaireFakemon = [<p key={0}>&nbsp;</p>];
        let listeFakemon = [<p key={0}>&nbsp;</p>];
        if (this.state.isLoaded){
            formulaireFakemon = [<FakemonForm key={1} fakemon={this.state.fakemonSelection} cleCharger={this.state.typeCharger} listeType={this.state.listeType} envoyerAlerte={this.envoyerAlerte} apikey={this.state.apikey}/>];
            listeFakemon = [<ListeFakemon key={1} cleCharger={this.state.isLoaded} chercherListeFakemon={this.chercherListeFakemon} listeFakemon={this.state.listeFakemon} envoyerAlerte={this.envoyerAlerte} apikey={this.state.apikey} miseAjourSelection={this.miseAjourSelection}/>]
        }
        else{
            formulaireFakemon = [<p key={0}>&nbsp;</p>];
            listeFakemon = [<p key={0}>&nbsp;</p>];
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
