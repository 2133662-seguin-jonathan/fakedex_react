import React, { Component } from 'react';
import { Paper, Grid, Alert, Collapse,IconButton } from '@mui/material';
import LoginForm from './LoginForm';
import ListeFakemon from './ListeFakemon';
import FakemonForm from './FakemonForm';
import {Close} from '@mui/icons-material';
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
          fakemonSelection:[]
        };
        this.fermerAlerte = this.fermerAlerte.bind(this);
        this.envoyerAlerte = this.envoyerAlerte.bind(this);
        this.changerApiKey = this.changerApiKey.bind(this);
        this.chercherListeFakemon = this.chercherListeFakemon.bind(this);
        this.rechargementCle = this.rechargementCle.bind(this);
    }

    rechargementCle(){
        this.setState({
            isLoaded: false
        });
    }

    fermerAlerte(e){
        this.setState({
            etatAlerte: false
        });
    }

    envoyerAlerte(typeAlerte,messageAlerte){
        this.setState({
            etatAlerte: true,
            typeAlerte: typeAlerte,
            messageAlerte: messageAlerte
        });
    }

    changerApiKey(apiKey){
        this.setState({
            apikey: apiKey
        });
        this.chercherListeFakemon();
    }

    chercherListeFakemon(){
        this.setState({
            isLoaded: true
        });
    }

    render() {
        if (this.state.isLoaded){
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
                                <LoginForm apikey={this.state.apikey} changerApiKey={this.changerApiKey} envoyerAlerte={this.envoyerAlerte} nouvCle={this.rechargementCle}/>
                            </Paper>
                            <Paper elevation={10} className={"listContainer"}>
                                <ListeFakemon cleCharger={this.state.isLoaded}/>
                            </Paper>
                        </Grid>
                        <Grid xs={6} item >
                            <Paper elevation={10} className={"formFakemonContainer"}>
                                <FakemonForm />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        else {
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
                                <LoginForm apikey={this.state.apikey} changerApiKey={this.changerApiKey} envoyerAlerte={this.envoyerAlerte} nouvCle={this.rechargementCle}/>
                            </Paper>
                            <Paper elevation={10} className={"listContainer"}>
                                <ListeFakemon cleCharger={this.state.isLoaded}/>
                            </Paper>
                        </Grid>
                        <Grid xs={6} item >
                            <Paper elevation={10} className={"formFakemonContainer"}>
                                <FakemonForm />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        
    }
}

export default MainContainer;
