import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {getEditorList} from "../../actions/EditorActions";
import Loading from "../Loading";
import AddEditor from "./AddEditor";
import AddIcon from '@material-ui/icons/Add';
import { IconButton, Button,
    Table, TableBody, TableCell, TableRow, TableHead, 
} from "@material-ui/core";

const EditorList = () => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const editorList = useSelector(state => state.EditorList);
    const user = useSelector(state => state.User);


    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getEditorList());
        };
        fetchData();
    }, [dispatch]);

    const changeValueOpen = (value) => {
        setOpen(value)
    }

    const showData = () => {
        if(!_.isEmpty(editorList.data)) {
            return (
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {editorList.data.map((row) => (
                    <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                        {row.editorName}
                    </TableCell>
                    <TableCell><Link to={`/editor/${row._id}`}><Button variant="outlined" color="primary">Détails</Button></Link></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            )
            
        }
        if(editorList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(editorList.errorMsg !== "") {
            return <p>{editorList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            <h1>Liste des Editeurs</h1>
            {user.isLoggedIn
                ?
                    <IconButton aria-label="add" color="primary" onClick={() => changeValueOpen(true)}>
                        <AddIcon />
                    </IconButton>
                :
                    <></>
            }
            {showData()}
            { open && <AddEditor/>}
            
        </div>
    )
}

export default EditorList;