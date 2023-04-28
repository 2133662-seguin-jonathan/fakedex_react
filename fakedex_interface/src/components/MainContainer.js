import React, { Component } from 'react';
import { Paper, Grid, Alert, Collapse,IconButton } from '@mui/material';
import LoginForm from './LoginForm';
import ListeFakemon from './ListeFakemon';
import FakemonForm from './FakemonForm';
import {Close} from '@mui/icons-material';
import "./MainContainer.css";

class MainContainer extends Component {
    render() {
        let alert = "";

        if (false){
            alert = [
                <Collapse in={true}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {"Close me!"}
                    </Alert>
                </Collapse>
            ];
        }

        return (
            <div id="container">
                {alert}
                <Grid container columnSpacing={2} >
                    <Grid xs={5} rowSpacing={2} item>
                        <Paper elevation={10} className={"formContainer"}>
                            <LoginForm />
                        </Paper>
                        <Paper elevation={10} className={"listContainer"}>
                            <ListeFakemon />
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

export default MainContainer;
