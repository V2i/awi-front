import React,{useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import {deleteContact, getContactList, patchContact} from "../../actions/ContactActions";
import {
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Paper, IconButton, TextField, FormControlLabel, Checkbox,InputBase, Grid
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Delete, Save, Create} from '@material-ui/icons';
import AddContact from "./AddContact";
import {green} from "@material-ui/core/colors";

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

    const showData = () => {
        if(!_.isEmpty(contactList.data)) {
            if(user.isLoggedIn) {
                return (
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Prénom</TableCell>
                                    <TableCell>Fixe</TableCell>
                                    <TableCell>Portable</TableCell>
                                    <TableCell>Mail</TableCell>
                                    <TableCell>Fonction</TableCell>
                                    <TableCell>Principal ?</TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contactList.data.filter((data) => {
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
                                                ? <TextField name="contactFirstname" label="Prénom" value={selectedContact.contactFirstname} onChange={handleChange}/>
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
                                                ? <TextField name="contactMail" label="Mél" value={selectedContact.contactMail} onChange={handleChange}/>
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
                )
            } else {
                return <p>Vous n'etes pas connecté</p>;
            }

        }
        if(contactList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(contactList.errorMsg !== "") {
            return <p>{contactList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
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