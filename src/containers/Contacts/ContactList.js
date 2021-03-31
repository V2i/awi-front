import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import {deleteContact, getContactList} from "../../actions/ContactActions";
import {
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Paper, Button, IconButton
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {Visibility, Delete, Save} from '@material-ui/icons';
import AddContact from "./AddContact";

const ContactList = () => {

    const [open, setOpen ] = React.useState(false);
    const dispatch = useDispatch();
    const contactList = useSelector(state => state.ContactList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getContactList());
        };
        fetchData();
    }, [dispatch]);

    const removeContact = (id) => {
        dispatch(deleteContact(id));
    }

    const showData = () => {
        if(!_.isEmpty(contactList.data)) {
            return (
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Prénom</TableCell>
                                <TableCell>Téléphone 1</TableCell>
                                <TableCell>Téléphone 2</TableCell>
                                <TableCell>Mail</TableCell>
                                <TableCell>Fonction</TableCell>
                                <TableCell>Principal ?</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contactList.data.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">{row.contactLastname}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactFirstname}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactPhone}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactMobilePhone}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactMail}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactFunction}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactMain ? 'Oui' : 'Non'}</TableCell>
                                    <TableCell align="right">
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
            <h1>Liste des Contacts</h1>
            <IconButton aria-label="add" color="primary" onClick={() => setOpen(true)}>
                <AddIcon />
            </IconButton>
            {showData()}
            {open && <AddContact open={open} handleClose={() => setOpen(false)} />}
        </div>
    )
}

export default ContactList;