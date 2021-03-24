import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavBar = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography>Festival des Jeux</Typography>
            <ChevronRightIcon />
            <Button color="inherit" href="/festival/list">Festival</Button>
            <Button color="inherit" href="/game/list">Jeux</Button>
            <Button color="inherit" href="/editor/list">Editeurs</Button>
            <Button color="inherit" href="/exhibitor/list">Exposants</Button>
            <Button color="inherit" href="/reservation/list">Réservations</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
export default NavBar;
