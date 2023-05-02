import React, { Component } from 'react';
import { List, LinearProgress,Button, Grid } from '@mui/material';
import './ListeFakemon.css';
import {Replay} from '@mui/icons-material';
import api from '../utils/Api';
import { decode } from "html-entities";
class ListeFakemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listeFakemon: this.props.listeFakemon,
            selectionFakemon: [],
            isLoaded: true
        };
        this.chercherListe = this.chercherListe.bind(this);
        this.selectionFakemon = this.selectionFakemon.bind(this);
    }

    selectionFakemon(e) {
        let idFakemon = parseInt(e.target.id);
        for (let index = 0; index < this.state.listeFakemon.length; index++) {
            if (this.state.listeFakemon[index]["id"] === idFakemon){
                this.setState({
                    selectionFakemon: this.state.listeFakemon[index]
                });
                this.props.miseAjourSelection(this.state.listeFakemon[index]);
            }
        }

    }

    componentDidMount() {
        if (this.props.cleCharger) {
            this.setState({
                isLoaded: false
            });
            let apiHeader = "apikey " + this.props.apikey;
            api({
                method: 'GET',
                url: '/fakemon',
                headers: {
                    Authorization: apiHeader
                }
            })
                .then((resultat) => {
                    this.setState({
                        isLoaded: true,
                        listeFakemon: resultat.data["data"]
                    });
                    this.props.chercherListeFakemon(resultat.data["data"]);
                })
                .catch((error) => {
                    if (error.response) {
                        const dataError = error.response;
                        if (dataError.status === 401) {
                            this.props.envoyerAlerte("error", "Une erreur imprévue a survenu lors de la recherche des fakemons. Veuillez en informer le propriétaire.");
                        }
                        else if (dataError.status === 403) {
                            this.props.envoyerAlerte("error", "Il y a eu une erreur lors de l'envoi de la clé api.");
                        }
                        else if (dataError.status === 500) {
                            this.props.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api. Veuillez réessayer plus tard.");
                        }
                    }
                })
        }
    } 

    chercherListe(e) {
        if (this.props.cleCharger) {
            this.setState({
                isLoaded: false
            });
            let apiHeader = "apikey " + this.props.apikey;
            api({
                method: 'GET',
                url: '/fakemon',
                headers: {
                    Authorization: apiHeader
                }
            })
                .then((resultat) => {
                    this.setState({
                        isLoaded: true,
                        listeFakemon: resultat.data["data"]
                    });
                    this.props.chercherListeFakemon(resultat.data["data"]);
                })
                .catch((error) => {
                    if (error.response) {
                        const dataError = error.response;
                        if (dataError.status === 401) {
                            this.props.envoyerAlerte("error", "Une erreur imprévue a survenu lors de la recherche des fakemons. Veuillez en informer le propriétaire.");
                        }
                        else if (dataError.status === 403) {
                            this.props.envoyerAlerte("error", "Il y a eu une erreur lors de l'envoi de la clé api.");
                        }
                        else if (dataError.status === 500) {
                            this.props.envoyerAlerte("error", "Il y a eu un problème de communication avec l'api. Veuillez réessayer plus tard.");
                        }
                    }
                })
        }
        else {
            this.props.envoyerAlerte("warning", "Vous ne vous êtes pas encore connecté.");
        }
    }

    render() {
        let liste = [<p key={0}>&nbsp;</p>];
        if (!this.state.isLoaded) {
            liste = [<LinearProgress key={0} variant="indeterminate" />];
        }
        else {
            if (this.state.listeFakemon !== undefined || this.state.listeFakemon.length !== 0) {
                liste = [];
                for (let index = 0; index < this.state.listeFakemon.length; index++) {
                    let fakemon = <Button  className='boutonListe' variant="contained" size='medium' type='submit' key={index} id={this.state.listeFakemon[index]["id"]}  onClick={this.selectionFakemon} >{decode(this.state.listeFakemon[index]["nom"], {level: 'html5'})}</Button>;
                    liste = [...liste, fakemon];
                    liste = [...liste, <br key={(index+"br")}></br>];
                }
            }
        }
        return (
            <div>
                <Grid container columnSpacing={3} id="titreListe">
                    <h2>Liste des fakemons:</h2>
                    <Button
                        onClick={() => {
                            this.chercherListe();
                        }}
                    >
                        <Replay ></Replay>
                    </Button>
                </Grid>
                <List id="fakemonList" >
                    {liste}
                </List>
            </div>
        );
    }
}

export default ListeFakemon;
