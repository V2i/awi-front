import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {IconButton, Menu, MenuItem, Typography} from '@material-ui/core';
import Login from "./Users/Login";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/UserActions";
import {AccountCircle } from "@material-ui/icons";
import {Link} from 'react-router-dom';

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
    const [anchorEl, setAnchorEl] = useState(null);
    const menu = Boolean(anchorEl);

    const changeValueOpen = (value) => {
        setOpen(value);
    };

    const logOut = () => {
        dispatch(logout());
        handleClose();
    };

    const myAccount = () => {
        handleClose();
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">Festival des Jeux</Typography>
                    <ChevronRightIcon/>
                    {user.isLoggedIn ?
                        <div>
                            <Button color="inherit" component={Link} to="/festival/list" className={classes.menuButton}>Festival</Button>
                            <Button color="inherit" component={Link} to="/game/list" className={classes.menuButton}>Jeux</Button>
                            <Button color="inherit" component={Link} to="/editor/list" className={classes.menuButton}>Editeurs</Button>
                            <Button color="inherit" component={Link} to="/exhibitor/list" className={classes.menuButton}>Exposants</Button>
                            <Button color="inherit" component={Link} to="/reservation/list" className={classes.menuButton}>Réservations</Button>
                            <Button color="inherit" component={Link} to="/user/list" className={classes.menuButton}>Utilisateurs</Button>
                        </div>
                    :
                        <div>
                            <Button color="inherit" component={Link} to="/game/list" className={classes.menuButton}>Jeux</Button>
                            <Button color="inherit" component={Link} to="/editor/list" className={classes.menuButton}>Editeurs</Button>
                        </div>
                    }
                    {user.isLoggedIn ?
                        <div className={classes.menuButtonRight}>
                            <IconButton variant="contained" color="default" onClick={handleMenu}>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={menu}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to="/profile" onClick={myAccount}>Mon Compte</MenuItem>
                                <MenuItem component={Link} to="/" onClick={logOut}>Deconnexion</MenuItem>
                            </Menu>
                        </div>
                        :
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