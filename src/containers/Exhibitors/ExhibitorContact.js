import React, {useState} from 'react';
import {
    TableCell, TableRow, IconButton,
} from "@material-ui/core";
import {patchContact, deleteContact} from "../../actions/ContactActions";
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {Delete, Save} from "@material-ui/icons";

const ExhibitorContact = ({contact, exhibitor}) => {

    const initialContact = {
        _id: contact._id,
        contactLastname: contact.contactLastname,
        contactFirstname: contact.contactFirstname,
        contactMobilePhone: contact.contactMobilePhone,
        contactMail: contact.contactMail,
        contactFunction: contact.contactFunction,
        contactMain: contact.contactMain
    };

    const [newContact, setContact] = useState(initialContact);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact({ ...newContact, [name]: value });
    };

    const removeContact = (id) => {
        dispatch(deleteContact(id, exhibitor));
    };

    const updateContact = (contact) => {
        dispatch(patchContact(contact));
    };

    return(
        <TableRow key={newContact._id}>
            <TableCell component="th" scope="newContact">{newContact.contactLastname}</TableCell>
            <TableCell component="th" scope="newContact">{newContact.contactFirstname}</TableCell>
            <TableCell component="th" scope="newContact">{newContact.contactPhone}</TableCell>
            <TableCell component="th" scope="newContact">{newContact.contactMobilePhone}</TableCell>
            <TableCell component="th" scope="newContact">{newContact.contactMail}</TableCell>
            <TableCell component="th" scope="newContact">{newContact.contactFunction}</TableCell>
            <TableCell component="th" scope="newContact">{newContact.contactMain ? 'Oui' : 'Non'}</TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" color="default" onClick={() => updateContact(newContact)}>
                    <Save />
                </IconButton>
                <IconButton aria-label="delete" color="secondary" onClick={() => removeContact(newContact._id)}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ExhibitorContact;