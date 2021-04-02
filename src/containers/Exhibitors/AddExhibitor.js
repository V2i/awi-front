import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { postExhibitor} from "../../actions/ExhibitorActions";
import {
    Button,
    TextField,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import AddEditor from "../Editors/AddEditor";
import {getEditorList} from "../../actions/EditorActions";

const AddExhibitor = ({open = false, handleClose}) => {

    const initialExhibitorState = {
        exhibitorName: "",
        exhibitorEditor: "",
        exhibitorContact: [],
    };

    const dispatch = useDispatch();
    const [exhibitor, setExhibitor] = useState(initialExhibitorState);
    const [addEditor, setAddEditor] = useState(false);
    const editorList = useSelector(state => state.EditorList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getEditorList());
        };
        fetchData();
    }, [dispatch]);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setExhibitor({ ...exhibitor, [name]: value });
        } 
    };

    const saveExhibitor = () => {
        handleClose("")
        dispatch(postExhibitor(exhibitor));
        setExhibitor(initialExhibitorState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Ajouter un nouvel exposant</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                
                    <Grid container spacing={3}>

                        <Grid item xs={6}>
                        <TextField name="exhibitorName" label="Nom" value={exhibitor.exhibitorName} onChange={handleInputChange}/>
                        </Grid>

                        { editorList.data &&
                        <Grid item xs={6}>
                            <FormControl style={{minWidth: "100%"}}>
                                <InputLabel id="exhibitorEditor">Editeur</InputLabel>
                                <Select
                                    labelId="exhibitorEditor"
                                    id="exhibitorEditorSelect"
                                    name="exhibitorEditor"
                                    value={editorList.data.find(e => e._id === exhibitor.exhibitorEditor)}
                                    onChange={handleInputChange}
                                    displayEmpty
                                >
                                    <MenuItem value={null} key="0">Non éditeur</MenuItem>
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
                    </Grid>
                
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={saveExhibitor}>Ajouter</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
            </DialogActions>
      </Dialog>
        
    );
}

export default AddExhibitor;