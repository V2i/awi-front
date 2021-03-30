import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { postGame } from "../../actions/GameActions";
import { getEditorList } from "../../actions/EditorActions";
import { getGameTypeList } from "../../actions/GameTypeActions";
import { Button, TextField, Grid, FormControl, Select, InputLabel, MenuItem, IconButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
 } from "@material-ui/core";
 import { Add} from '@material-ui/icons';
 import AddEditor from "../Editors/AddEditor";
 
const AddGame = ({open = false, handleClose}) => {

    const initialGameState = {
        gameName: "",
        gameMinimumAge: 0,
        gameDuration: 0,
        gameMinimumPlayers: 0,
        gameMaximumPlayers: 0,
        isPrototype: false,
        gameType:"",
        gameEditor: "",
        gameNotice: "",
    };

    const dispatch = useDispatch();
    const [game, setGame] = useState(initialGameState);
    const [addEditor, setAddEditor] = useState(false);
    const [addGameType, setGameType] = useState(false);
    const editorList = useSelector(state => state.EditorList);
    const gameTypeList = useSelector(state => state.GameTypeList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getEditorList());
            dispatch(getGameTypeList());
        };
        fetchData();
    }, [dispatch]);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setGame({ ...game, [name]: value });
        } 
    };

    const saveGame = () => {
        handleClose()
        dispatch(postGame(game));
        setGame(initialGameState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Ajouter un nouveau jeu</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <TextField name="gameName" label="Nom" value={game.gameName} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField name="gameMinimumAge" label="Age min" value={game.gameMinimumAge} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField name="gameDuration" label="Durée" value={game.gameDuration} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField name="gameMinimumPlayers" label="Nb Joueurs min" value={game.gameMinimumPlayers} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField name="gameMaximumPlayers" label="Nb Joueurs max" value={game.gameMaximumPlayers} onChange={handleInputChange}/>
                        </Grid>
                        
                            
                        <Grid item xs={4}>
                            <TextField name="isPrototype" label="Prototype ?" value={game.isPrototype} onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField name="gameNotice" label="Notice" value={game.gameNotice} onChange={handleInputChange}/>
                        </Grid>

                        { editorList.data && 
                        <Grid item xs={6}>
                            <FormControl>
                                <InputLabel id="gameEditor">Editeur</InputLabel>
                                <Select
                                labelId="gameEditor"
                                id="gameEditorSelect"
                                name="gameEditor"
                                value={editorList.data.find(e => e._id === game.gameEditor)}
                                onChange={handleInputChange}
                                displayEmpty
                                >
                                {editorList.data.map(e => <MenuItem value={e._id} key={e._id}>{e.editorName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <IconButton onClick={() => setAddEditor(true)}>
                                <Add/>
                            </IconButton>
                            {
                                addEditor && <AddEditor open={addEditor} handleClose={() => setAddEditor(false)}/>
                            }
                        </Grid>
                        }

                        { gameTypeList.data && 
                        <Grid item xs={6}>
                            <FormControl>
                                <InputLabel id="gameType">Catégorie</InputLabel>
                                <Select
                                labelId="gameType"
                                id="gameTypeSelect"
                                name="gameType"
                                value={gameTypeList.data.find(t => t._id === game.gameEditor)}
                                onChange={handleInputChange}
                                >
                                {gameTypeList.data.map(t => <MenuItem value={t._id} key={t._id}>{t.gameTypeName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <IconButton onClick={() => setGameType(true)}>
                                <Add/>
                            </IconButton>
                        </Grid>
                        }
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={saveGame}>Ajouter</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddGame;