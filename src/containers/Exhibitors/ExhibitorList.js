import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import {getExhibitorList, deleteExhibitor, patchExhibitor} from "../../actions/ExhibitorActions";
import { 
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Paper, Button, IconButton, Grid, InputBase, TextField,TablePagination
  } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AddExhibitor from "./AddExhibitor";
import { Visibility, Create, Delete, Save } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const ExhibitorList = () => {

    const [open, setOpen ] = React.useState(false);
    const dispatch = useDispatch();
    const [selectedExhibitor, setExhibitor] = React.useState(false);
    const user = useSelector(state => state.User);
    const exhibitorList = useSelector(state => state.ExhibitorList);
    const searchInitialState ={
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getExhibitorList());
        };
        fetchData();
    }, [dispatch]);

    const removeExhibitor = (id) => {
        dispatch(deleteExhibitor(id));
    }

    const searchSpace = (event)=>{
        let keyword = event.target.value;
        setState({search:keyword})
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExhibitor({...selectedExhibitor, [name] : value})
    }

    const saveExhibitor = (exhibitorSelected) => {
        dispatch(patchExhibitor(exhibitorSelected))
        setExhibitor({})
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
        if(!_.isEmpty(exhibitorList.data)) {
            return (
                
                <>
                <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{'font-weight':'bold'}}>Nom</TableCell>
                            <TableCell style={{'font-weight':'bold'}} >Est Editeur ?</TableCell>
                            <TableCell style={{'font-weight':'bold'}}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exhibitorList.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((data) => {
                            if(searchState.search == null)
                                return data
                            else if(data.exhibitorName.toLowerCase().includes(searchState.search.toLowerCase())){
                                return data
                            }
                            })
                            .map(row => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {selectedExhibitor._id === row._id ? <TextField name="exhibitorName" label="Nom" value={selectedExhibitor.exhibitorName} onChange={handleChange}/> : row.exhibitorName }
                                    </TableCell>
                                    <TableCell>{row.exhibitorEditor ? <Link to={`/editor/${row.exhibitorEditor._id}`}><Button variant="outlined">{row.exhibitorEditor.editorName}</Button></Link>: 'Non'}</TableCell>
                                    {user.isLoggedIn
                                    ?
                                        <TableCell>
                                            <IconButton variant="outlined" color="primary" component={Link} to={`/exhibitor/${row._id}`}><Visibility /></IconButton>
                                            { selectedExhibitor._id === row._id
                                                ? <IconButton variant="outlined" onClick={() => saveExhibitor(selectedExhibitor)}><Save /></IconButton>
                                                : <IconButton variant="outlined" onClick={() => setExhibitor(row)}><Create /></IconButton>
                                            }
                                            <IconButton variant="outlined" color="secondary" onClick={() => removeExhibitor(row._id)}><Delete /></IconButton>
                                        </TableCell>
                                    :
                                        <></>
                                }
                                </TableRow>
                            ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={exhibitorList.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>
            </>
                
                
                // <TableContainer component={Paper}>
                //     <Table size="small" aria-label="simple table">
                //         <TableHead>
                //         <TableRow>
                //             <TableCell>Nom</TableCell>
                //             <TableCell align="right">Est Editeur ?</TableCell>
                //             <TableCell> </TableCell>
                //         </TableRow>
                //         </TableHead>
                //         <TableBody>
                        // {exhibitorList.data.filter((data) => {
                        // if(searchState.search == null)
                        //     return data
                        // else if(data.exhibitorName.toLowerCase().includes(searchState.search.toLowerCase())){
                        //     return data
                        // }
                        // })
                        // .map(row => (
                        //     <TableRow key={row._id}>
                        //         <TableCell component="th" scope="row">
                        //             {selectedExhibitor._id === row._id ? <TextField name="exhibitorName" label="Nom" value={selectedExhibitor.exhibitorName} onChange={handleChange}/> : row.exhibitorName }
                        //         </TableCell>
                        //         <TableCell align="right">{row.exhibitorEditor ? <Link to={`/editor/${row.exhibitorEditor._id}`}><Button variant="outlined">{row.exhibitorEditor.editorName}</Button></Link>: 'Non'}</TableCell>
                        //         {user.isLoggedIn
                        //         ?
                        //             <TableCell>
                        //                 <IconButton variant="outlined" color="primary" component={Link} to={`/exhibitor/${row._id}`}><Visibility /></IconButton>
                        //                 { selectedExhibitor._id === row._id
                        //                     ? <IconButton variant="outlined" onClick={() => saveExhibitor(selectedExhibitor)}><Save /></IconButton>
                        //                     : <IconButton variant="outlined" onClick={() => setExhibitor(row)}><Create /></IconButton>
                        //                 }
                        //                 <IconButton variant="outlined" color="secondary" onClick={() => removeExhibitor(row._id)}><Delete /></IconButton>
                        //             </TableCell>
                        //         :
                        //             <></>
                        //     }
                        //     </TableRow>
                        // ))}
                //         </TableBody>
                //     </Table>
                // </TableContainer>
            )
        }
        if(exhibitorList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(exhibitorList.errorMsg !== "") {
            return <p>{exhibitorList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <h1>Liste des Exposants</h1>
                <IconButton aria-label="add" color="primary" onClick={() => setOpen(true)}>
                    <AddIcon />
                </IconButton>
                <InputBase  type="text" placeholder="Recherche..." onChange={(e)=>searchSpace(e)} />
                {showData()}
                {open && <AddExhibitor open={open} handleClose={() => setOpen(false)} />}
            </Grid>

        </div>
    )
}

export default ExhibitorList;