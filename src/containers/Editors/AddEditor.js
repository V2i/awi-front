import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import { postEditor} from "../../actions/EditorActions";
import { Button, TextField, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
 } from "@material-ui/core";

const AddEditor = ({open = true, handleClose}) => {

    const initialEditorState = {
        editorName: ""
    };

    const dispatch = useDispatch();
    const [editor, setEditor] = useState(initialEditorState);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setEditor({ ...editor, [name]: value });
        } 
    };

    const saveEditor = () => {
        handleClose()
        const data = {
            editorName: editor.editorName,
        };
        dispatch(postEditor(data));
        setEditor(initialEditorState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Ajouter un nouvel éditeur"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <TextField name="editorName" label="Nom" value={editor.editorName} onChange={handleInputChange}/>
                        </Grid>
                    </Grid>
                
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="primary" onClick={saveEditor}>Ajouter</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Annuler
            </Button>
            </DialogActions>
      </Dialog>
        
    );
}

export default AddEditor;