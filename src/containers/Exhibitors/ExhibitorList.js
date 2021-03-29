import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import {getExhibitorList, deleteExhibitor} from "../../actions/ExhibitorActions";
import { 
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Paper, Button, IconButton
  } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AddExhibitor from "./AddExhibitor";
import { Visibility, Delete} from '@material-ui/icons';

const ExhibitorList = () => {
    const [open, setOpen ] = React.useState(false);
    const dispatch = useDispatch();
    const exhibitorList = useSelector(state => state.ExhibitorList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getExhibitorList());
        };
        fetchData();
    }, [dispatch]);

    const removeExhibitor = (id) => {
        dispatch(deleteExhibitor(id));
    }

    const showData = () => {
        if(!_.isEmpty(exhibitorList.data)) {
            return (
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell align="right">Est Editeur ?</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {exhibitorList.data.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.exhibitorName}
                                </TableCell>
                                <TableCell align="right">{row.exhibitorEditor ? <Button  variant="outlined" href={`/editor/${row.exhibitorEditor._id}`}>{row.exhibitorEditor.editorName}</Button>: 'Non'}</TableCell>
                                <TableCell>
                                    <IconButton variant="contained" color="primary" href={`${row._id}`}>
                                        <Visibility />
                                    </IconButton>
                                    
                                    <IconButton variant="contained" color="secondary" onClick={() => removeExhibitor(row._id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
        if(exhibitorList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(exhibitorList.errorMsg !== "") {
            return <p>{exhibitorList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            <h1>Liste des Exposants</h1>
            <IconButton aria-label="add" color="primary" onClick={() => setOpen(true)}>
                <AddIcon />
            </IconButton>
            {showData()}
            {open && <AddExhibitor open={open} handleClose={() => setOpen(false)} />}
        </div>
    )
}

export default ExhibitorList;