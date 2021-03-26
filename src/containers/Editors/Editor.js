import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getEditorByID} from "../../actions/EditorActions";
import _ from "lodash";
import Loading from "../Loading";
import {patchEditor, deleteEditor} from "../../actions/EditorActions";
import { Grid, Button, TextField } from "@material-ui/core";

const Editor = (props) => {

    const editorId = props.match.params.id;
    const dispatch = useDispatch();
    const editor = useSelector(state => state.Editor);

    React.useEffect(() => {
        dispatch(getEditorByID(editorId));
    }, [dispatch, editorId]);


    const initialEditor = {
        _id: editorId,
        editorName: editor.editorName
    }

    const [editorSelected, setEditor] = React.useState(initialEditor);
    const [toUpdate, setUpdate] = React.useState(false);

    const handleChange = (event) => {
        if(event.target) {
            const { name, value } = event.target;
            setEditor({ ...editorSelected, [name]: value });
        } 
    };

    const removeEditor = (id) => {
        dispatch(deleteEditor(id));
    }

    const updateEditor = (editor) => {
        setUpdate(false);
        dispatch(patchEditor(editor));
        setEditor(initialEditor);
    }

    const showData = () => {
        if(!_.isEmpty(editor.data)) {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12}><h1>{editor.data.editorName}</h1></Grid>
                    { toUpdate && 
                    <Grid item xs={4}>
                        <TextField name="editorName" label="Nom" value={editorSelected.editorName} onChange={handleChange}/>
                        <Button onClick={() => updateEditor(editorSelected)}>Modifier</Button>
                    </Grid>
                    
                    }
                    { !toUpdate && 
                        <Grid item xs={4}>
                            <Button onClick={() => setUpdate(true)}>Modifier</Button>
                        </Grid>
                    }
                    
                    <Grid item xs={4}>
                        <Button onClick={() => removeEditor(editorId)}>Supprimer</Button>
                    </Grid>
                    
                </Grid>
            
            )
        }
        if(editor.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(editor.errorMsg !== "") {
            return <p>{editor.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Editor;