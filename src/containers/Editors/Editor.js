import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getGameListByEditorID } from "../../actions/GameActions";
import _ from "lodash";
import Loading from "../Loading";
import {getEditorByID, patchEditor, deleteEditor} from "../../actions/EditorActions";
import { Grid, Button, TextField, Typography,
    Table, TableBody, TableCell, TableRow, TableHead, 
 } from "@material-ui/core";
 import IconButton from '@material-ui/core/IconButton';
 import { Visibility, Add, Create, Delete} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import AddGame from "../Games/AddGame";

const Editor = (props) => {

    const editorId = props.match.params.id;
    const dispatch = useDispatch();
    const editor = useSelector(state => state.Editor);
    const gameList = useSelector(state => state.GameList);
    const user = useSelector(state => state.User);


    React.useEffect(() => {
        dispatch(getEditorByID(editorId));
        dispatch(getGameListByEditorID(editorId))
    }, [dispatch, editorId]);


    const initialEditor = {
        _id: editorId,
        editorName: editor.editorName
    }

    const [editorSelected, setEditor] = React.useState(initialEditor);
    const [toUpdate, setUpdate] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const changeValueOpen = (value) => {
        setOpen(value)
    };

    const handleChange = (event) => {
        if(event.target) {
            const { name, value } = event.target;
            setEditor({ ...editorSelected, [name]: value });
        } 
    };

    const removeEditor = (id) => {
        dispatch(deleteEditor(id));
    };

    const updateEditor = (editor) => {
        setUpdate(false);
        dispatch(patchEditor(editor));
        setEditor(initialEditor);
    }

    const showData = () => {
        if(!_.isEmpty(editor.data)) {
            if(user.isLoggedIn) {
                return(
                    <Grid container spacing={3}>
                        <Grid item xs={12}><h1>{editor.data.editorName}</h1></Grid>

                        {toUpdate &&
                        <Grid item xs={4}>
                            <TextField name="editorName" label="Nom" value={editorSelected.editorName}
                                       onChange={handleChange}/>
                            <Button onClick={() => updateEditor(editorSelected)}>Modifier</Button>
                        </Grid>
                        }
                        {!toUpdate &&
                        <Grid item xs={4}>
                            <Button onClick={() => setUpdate(true)}>Modifier</Button>
                        </Grid>}

                        <Grid item xs={4}>
                            <Button onClick={() => removeEditor(editorId)}>Supprimer</Button>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography><h3>Liste des jeux</h3></Typography>
                            <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Age Min</TableCell>
                                        <TableCell>Durée (en min)</TableCell>
                                        <TableCell>Min Joueurs</TableCell>
                                        <TableCell>Max Joueurs</TableCell>
                                        <TableCell>Catégorie</TableCell>
                                        <TableCell>Notice</TableCell>
                                        <TableCell>Prototype ?</TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gameList.data.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{row.gameName}</TableCell>
                                            <TableCell>{row.gameMinimumAge}</TableCell>
                                            <TableCell>{row.gameDuration}</TableCell>
                                            <TableCell>{row.gameMinimumPlayers}</TableCell>
                                            <TableCell>{row.gameMaximumPlayers}</TableCell>
                                            <TableCell>{row.gameType.gameTypeName}</TableCell>
                                            <TableCell>{row.gameNotice}</TableCell>
                                            <TableCell>{row.isPrototype ? 'Oui' : 'Non'}</TableCell>
                                            <TableCell>
                                                <IconButton variant="outlined" color="primary" component={Link} to={`/game/${row._id}`}><Visibility /></IconButton>
                                                <IconButton variant="outlined" color="primary" ><Create /></IconButton>
                                                <IconButton variant="outlined" color="primary" ><Delete /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                )
            } else {
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}><h1>{editor.data.editorName}</h1></Grid>

                        <Grid item xs={9}>
                            <Typography><h3>Liste des jeux</h3></Typography>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Age Min</TableCell>
                                        <TableCell>Durée (en min)</TableCell>
                                        <TableCell>Min Joueurs</TableCell>
                                        <TableCell>Max Joueurs</TableCell>
                                        <TableCell>Catégorie</TableCell>
                                        <TableCell>Notice</TableCell>
                                        <TableCell>Prototype ?</TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gameList.data.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{row.gameName}</TableCell>
                                            <TableCell>{row.gameMinimumAge}</TableCell>
                                            <TableCell>{row.gameDuration}</TableCell>
                                            <TableCell>{row.gameMinimumPlayers}</TableCell>
                                            <TableCell>{row.gameMaximumPlayers}</TableCell>
                                            <TableCell>{row.gameType.gameTypeName}</TableCell>
                                            <TableCell>{row.gameNotice}</TableCell>
                                            <TableCell>{row.isPrototype ? 'Oui' : 'Non'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                )
            }
        }
        if(editor.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(editor.errorMsg !== "") {
            return <p>{editor.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            {showData()}
            <AddGame open={open} handleClose={() => changeValueOpen(false)}/>
        </div>
    )
}

export default Editor;