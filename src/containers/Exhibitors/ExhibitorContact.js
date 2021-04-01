import React, {useState} from 'react';
import {
    TableCell, TableRow, IconButton, FormControlLabel, Checkbox,
} from "@material-ui/core";
import {patchContact, deleteContact} from "../../actions/ContactActions";
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import {Create, Delete, Save} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";

const ExhibitorContact = ({contact, exhibitor}) => {


    const [selectedContact, setContact] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value, checked} = event.target;
        setContact({ ...selectedContact, [name]: (name === "contactMain" ? checked : value) });
    };

    const removeContact = (id) => {
        dispatch(deleteContact(id, exhibitor));
    };

    const saveContact = (contact) => {
        dispatch(patchContact(contact));
        setContact({});
    };

    return(
        <TableRow key={contact._id}>
            <TableCell component="th" scope="contact">
                { selectedContact._id === contact._id
                    ? <TextField name="contactLastname" label="Nom" value={selectedContact.contactLastname} onChange={handleChange}/>
                    : contact.contactLastname
                }
            </TableCell>
            <TableCell component="th" scope="contact">
                { selectedContact._id === contact._id
                    ? <TextField name="contactFirstname" label="Prénom" value={selectedContact.contactFirstname} onChange={handleChange}/>
                    : contact.contactFirstname
                }
            </TableCell>
            <TableCell component="th" scope="contact">
                { selectedContact._id === contact._id
                    ? <TextField name="contactPhone" label="Fixe" value={selectedContact.contactPhone} onChange={handleChange}/>
                    : contact.contactPhone
                }
            </TableCell>
            <TableCell component="th" scope="contact">
                { selectedContact._id === contact._id
                    ? <TextField name="contactMobilePhone" label="Portable" value={selectedContact.contactMobilePhone} onChange={handleChange}/>
                    : contact.contactMobilePhone
                }
            </TableCell>
            <TableCell component="th" scope="contact">
                { selectedContact._id === contact._id
                    ? <TextField name="contactMail" label="Mél" value={selectedContact.contactMail} onChange={handleChange}/>
                    : contact.contactMail
                }
            </TableCell>
            <TableCell component="th" scope="contact">
                { selectedContact._id === contact._id
                    ? <TextField name="contactFunction" label="Fonction" value={selectedContact.contactFunction} onChange={handleChange}/>
                    : contact.contactFunction
                }
            </TableCell>
            <TableCell>
                {selectedContact._id === contact._id
                    ? <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedContact.contactMain}
                                onChange={handleChange}
                                name="contactMain"
                                color="primary"
                            />
                        }
                    />
                    : <Checkbox
                        checked={contact.contactMain}
                        disabled
                        name="contactMain"
                        color="primary"
                    />
                }
            </TableCell>

            <TableCell align="right">
                { selectedContact._id === contact._id
                    ? <IconButton variant="outlined" onClick={() => saveContact(selectedContact)}><Save /></IconButton>
                    : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setContact(contact)}><Create /></IconButton>
                }
                <IconButton aria-label="delete" color="secondary" onClick={() => removeContact(contact._id)}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ExhibitorContact;