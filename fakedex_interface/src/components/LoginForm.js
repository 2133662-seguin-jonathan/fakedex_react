import React, { Component } from 'react';
import "./LoginForm.css";
import { TextField, colors,List,Grid,Button,Paper, LinearProgress } from '@mui/material';
class LoginForm extends Component {
    
    render() {
        let progressBar = "";
        if (false){
            progressBar = <LinearProgress variant="indeterminate" />;
        } else {
            progressBar = <LinearProgress variant="determinate" value={0} />;
        }
        return (
            <div>
                <form id='formLogin'>
                    <h2 id='titreForm'>Connection à l'api</h2>

                    <List >
                        <TextField id="formUsername" label="Username" variant="filled" className='usagerInfo' helperText="Nombre de caractères maximum est de 200" inputProps={{ maxLength: 200 }}/>
                        
                        <TextField id="formPassword" label="Password" variant="filled" className='usagerInfo' helperText="Le mot de passe"/>

                        <Grid container columnSpacing={2} id={"boutonForm"}>
                            <Grid xs={5} item>
                                <Button variant="contained" size='medium' type='submit'>Connecter</Button>
                            </Grid>
                            <Grid xs={5} item>
                                <Button variant="contained" size='medium' type='submit'>Nouvelle clé</Button>
                            </Grid>
                        </Grid>

                        <Paper elevation={10} className='infoCle'>
                            <h2 id='titreCle'>Clé: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {"************************************"}</h2>
                            {progressBar}
                        </Paper>

                    </List>


                </form>
            </div>
        );
    }
}

export default LoginForm;
