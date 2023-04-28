import React, { Component } from 'react';
import { List, LinearProgress, ListItem, ListItemButton,IconButton,ListItemText } from '@mui/material';
import './ListeFakemon.css';
import { Delete } from '@mui/icons-material';

class ListeFakemon extends Component {
    render() {
        let liste = <LinearProgress variant="indeterminate" />;
        if (true){
            liste = [
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={1} primary={'Léviathan'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense >
                            <ListItemText id={2} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" > 
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense >
                            <ListItemText id={3} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem' >
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={4} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" > 
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={5} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={6} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={7} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="delete" >
                        <Delete />
                    </IconButton>
                }
                    disablePadding className='fakemonListItem'>
                        <ListItemButton role={undefined}  dense>
                            <ListItemText id={8} primary={'Test'} className='textListFakemon'/>
                        </ListItemButton>
                </ListItem>,
                <ListItem secondaryAction={
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
