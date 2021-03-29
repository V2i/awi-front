import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {IconButton, Typography} from '@material-ui/core';
import Login from "./Users/Login";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/UserActions";
import {AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    menuButton: {
        marginRight: theme.spacing(2),
        '&:hover': {
            color: "white",
        }
    },

    menuButtonRight: {
        marginRight: theme.spacing(2),
        marginLeft: "auto",
        '&:hover': {
            color: "white",
        }
    },

    title: {
        flexGrow: 1,
    },

    offset: theme.mixins.toolbar,
}));

const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector(state => state.User);

    const [open, setOpen] = useState(false);

    const changeValueOpen = (value) => {
        setOpen(value);
    };

    const logOut = () => {
        dispatch(logout());
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">Festival des Jeux</Typography>
                    <ChevronRightIcon/>
                    <Button color="inherit" href="/festival/list" className={classes.menuButton}>Festival</Button>
                    <Button color="inherit" href="/game/list" className={classes.menuButton}>Jeux</Button>
                    <Button color="inherit" href="/editor/list" className={classes.menuButton}>Editeurs</Button>
                    <Button color="inherit" href="/exhibitor/list" className={classes.menuButton}>Exposants</Button>
                    <Button color="inherit" href="/reservation/list" className={classes.menuButton}>Réservations</Button>
                    <Button color="inherit" href="/user/list" className={classes.menuButton}>Utilisateurs</Button>
                    {user.isLoggedIn ?
                        <IconButton variant="contained" color="default" className={classes.menuButtonRight} onClick={logOut}>
                            <AccountCircle />
                        </IconButton> :
                        <Button color="inherit" className={classes.menuButtonRight} onClick={() => changeValueOpen(true)}>
                            Connexion
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            <div className={classes.offset}/>
            <Login open={open} handleClose={() => changeValueOpen(false)}/>
        </div>
    );
}
export default NavBar;