import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getEditorList, deleteEditor, patchEditor} from "../../actions/EditorActions";
import { makeStyles } from '@material-ui/core/styles';
import Loading from "../Loading";
import AddEditor from "./AddEditor";
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

import {  Visibility, Create, Delete, Save } from '@material-ui/icons';
import { IconButton, Paper, TextField,
    Table, TableBody, TableCell, TableRow, TableHead, InputBase, Grid, TableContainer,TablePagination
} from "@material-ui/core";

const EditorList = () => {

    const [open, setOpen] = React.useState(false);
    const [selectedEditor, setEditor] = React.useState(false);
    const dispatch = useDispatch();
    const editorList = useSelector(state => state.EditorList);
    const user = useSelector(state => state.User);

    const searchInitialState = {
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getEditorList());
        };
        fetchData();
    }, [dispatch]);

    const changeValueOpen = (value) => {
        setOpen(value)
    }

    const searchSpace = (event)=>{
        let keyword = event.target.value;
        setState({search:keyword})
        console.log(searchState.search)
    }

    const removeEditor = (id) => {
        dispatch(deleteEditor(id));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditor({...selectedEditor, [name] : value})
    }

    const saveEditor = (editorSelected) => {
        dispatch(patchEditor(editorSelected))
        setEditor({})
    }
    const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 500,
        },
      });

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const showData = () => {
        if(!_.isEmpty(editorList.data)) {
            return (
                <>
                <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                       
                            <TableCell>
                            <div style={{'font-weight':'bold'}}>Nom</div>
                            </TableCell>
                            <TableCell></TableCell>
                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editorList.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((data) => {
                            if(searchState.search == null)
                                return data
                            else if(data.editorName.toLowerCase().includes(searchState.search.toLowerCase())){
                                return data
                            }
                        })
                        .map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell component="th" scope="row">
                                    {selectedEditor._id === row._id ? <TextField name="editorName" label="Nom" value={selectedEditor.editorName} onChange={handleChange}/> : row.editorName }
                                
                                </TableCell>
                                <TableCell>
                                        <IconButton variant="outlined" color="primary" component={Link} to={`/editor/${row._id}`}><Visibility /></IconButton>
                                        { selectedEditor._id === row._id
                                            ? <IconButton variant="outlined" onClick={() => saveEditor(selectedEditor)}><Save /></IconButton>
                                            : <IconButton variant="outlined" onClick={() => setEditor(row)}><Create /></IconButton>
                                        }
                                        <IconButton variant="outlined" color="secondary" onClick={() => removeEditor(row._id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={editorList.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>
            </>
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
            <Grid container direction="column" justify="center" alignItems="center">
            <h1>Liste des Editeurs</h1>
            {user.isLoggedIn
                ?
                    <IconButton aria-label="add" color="primary" onClick={() => changeValueOpen(true)}>
                        <AddIcon />
                    </IconButton>
                :
                    <></>
            }
            <InputBase  type="text" placeholder="Recherche..." onChange={(e)=>searchSpace(e)} />
            
            
            
            {showData()}
            { open && <AddEditor open={open} handleClose={() => changeValueOpen(false)}/>}
            </Grid>
            
        </div>
    )
}

export default EditorList;