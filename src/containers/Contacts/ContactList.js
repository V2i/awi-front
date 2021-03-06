import React,{useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import {deleteContact, getContactList, patchContact} from "../../actions/ContactActions";
import {
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Paper, IconButton, TextField, FormControlLabel, Checkbox,InputBase, Grid,TablePagination
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Delete, Save, Create} from '@material-ui/icons';
import AddContact from "./AddContact";
import {green} from "@material-ui/core/colors";
import { makeStyles } from '@material-ui/core/styles';

const ContactList = () => {

    const [open, setOpen ] = React.useState(false);
    const [selectedContact, setContact] = React.useState(false);
    const dispatch = useDispatch();
    const contactList = useSelector(state => state.ContactList);
    const user = useSelector(state => state.User);
    const searchInitialState ={
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);
    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getContactList());
        };
        fetchData();
    }, [dispatch]);

    const removeContact = (id) => {
        dispatch(deleteContact(id));
    };

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setContact({...selectedContact, [name] : (name === "contactMain" ? checked : value) });
    };

    const saveContact = (selectedContact) => {
        dispatch(patchContact(selectedContact));
        setContact(false);
    };

    const searchSpace = (event)=>{
        let keyword = event.target.value;
        setState({search:keyword})
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
        if(!_.isEmpty(contactList.data)) {
            if(user.isLoggedIn) {
                return (
                    <>
                    <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            <TableCell style={{'font-weight':'bold'}}>Nom</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Pr??nom</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Fixe</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Portable</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Mail</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Fonction</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Principal ?</TableCell>
                            <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {contactList.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((data) => {
                                    if(searchState.search == null)
                                        return data
                                    else if(data.contactLastname.toLowerCase().includes(searchState.search.toLowerCase()) || data.contactFirstname.toLowerCase().includes(searchState.search.toLowerCase()) || data.contactMail.toLowerCase().includes(searchState.search.toLowerCase())){
                                        return data
                                    }
                                })
                                .map(row => (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                            { selectedContact._id === row._id
                                            ? <TextField name="contactLastname" label="Nom" value={selectedContact.contactLastname} onChange={handleChange}/>
                                            : row.contactLastname
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            { selectedContact._id === row._id
                                                ? <TextField name="contactFirstname" label="Pr??nom" value={selectedContact.contactFirstname} onChange={handleChange}/>
                                                : row.contactFirstname
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            { selectedContact._id === row._id
                                                ? <TextField name="contactPhone" label="Fixe" value={selectedContact.contactPhone} onChange={handleChange}/>
                                                : row.contactPhone
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            { selectedContact._id === row._id
                                                ? <TextField name="contactMobilePhone" label="Portable" value={selectedContact.contactMobilePhone} onChange={handleChange}/>
                                                : row.contactMobilePhone
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            { selectedContact._id === row._id
                                                ? <TextField name="contactMail" label="M??l" value={selectedContact.contactMail} onChange={handleChange}/>
                                                : row.contactMail
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            { selectedContact._id === row._id
                                                ? <TextField name="contactFunction" label="Fonction" value={selectedContact.contactFunction} onChange={handleChange}/>
                                                : row.contactFunction
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {selectedContact._id === row._id
                                                ? <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={selectedContact.contactMain}
                                                            onChange={handleChange}
                                                            name="contactMain"
                                                            color="primary"
                                                        />
                                                    }
                                                  label=""/>
                                                : <Checkbox
                                                    checked={row.contactMain}
                                                    disabled
                                                    name="contactMain"
                                                    color="primary"
                                                />
                                            }
                                        </TableCell>

                                        <TableCell align="right">
                                            { selectedContact._id === row._id
                                                ? <IconButton variant="outlined" onClick={() => saveContact(selectedContact)}><Save /></IconButton>
                                                : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setContact(row)}><Create /></IconButton>
                                            }
                                            <IconButton aria-label="delete" color="secondary" onClick={() => removeContact(row._id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={contactList.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    </Paper>
                </>

                )
            } else {
                return <p>Vous n'etes pas connect??</p>;
            }

        }
        if(contactList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(contactList.errorMsg !== "") {
            return <p>{contactList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des donn??es</p>;
    };

    return(
        <div>
            
             <Grid container direction="column" justify="center" alignItems="center">
            <h1>Liste des Contacts</h1>
            {
                user.isLoggedIn
                ?<IconButton aria-label="add" color="primary" onClick={() => setOpen(true)}><AddIcon /></IconButton>
                :<></>
            }
            <InputBase  type="text" placeholder="Recherche..." onChange={(e)=>searchSpace(e)} />
            {showData()}
            {open && <AddContact open={open} handleClose={() => setOpen(false)} />}
            </Grid>
        </div>
    )
}

export default ContactList;