import React, { Component } from 'react';
import { List, LinearProgress, ListItem, ListItemButton,IconButton,ListItemText } from '@mui/material';
import './ListeFakemon.css';
import { Delete } from '@mui/icons-material';

class ListeFakemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        let liste = <LinearProgress variant="indeterminate" />;
        if (this.props.cleCharger){
            liste = [
                <ListItem key ={1} secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={1} primary={'Léviathan'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem key ={2} secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense >
                            <ListItemText id={2} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem key ={3} secondaryAction={
                    <IconButton edge="end" aria-label="delete" > 
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense >
                            <ListItemText id={3} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem key ={4} secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem' >
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={4} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem key ={5} secondaryAction={
                    <IconButton edge="end" aria-label="delete" > 
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={5} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem key ={6} secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={6} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem key ={7} secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={7} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem key ={8} secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={8} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem key ={9} secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={9} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>
            ];
        }
        return (
            <div>
                <h2>Liste des fakemons:</h2>
                <List id="fakemonList">
                    {liste}
                </List>
            </div>
        );
    }
}

export default ListeFakemon;
