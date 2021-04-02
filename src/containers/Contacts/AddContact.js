import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    TextField,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from "@material-ui/core";
import {getExhibitorList} from "../../actions/ExhibitorActions";
import {Add} from "@material-ui/icons";
import AddExhibitor from "../Exhibitors/AddExhibitor";
import {postContact} from "../../actions/ContactActions";

const AddContact = ({open = true, handleClose}) => {

    const initialContactState = {
        contactLastname: "",
        contactFirstname: "",
        contactMobilePhone: "",
        contactMail: "",
        contactFunction: "",
        contactMain: false
    };


    const dispatch = useDispatch();
    const exhibitorList = useSelector(state => state.ExhibitorList);
    const [exhibitor, setExhibitor] = useState(exhibitorList.data[0]);
    const [addExhibitor, setAddExhibitor] = useState(false);
    const [contact, setContact] = useState(initialContactState);

    useEffect(() => {
        const fetchData = () => {
            dispatch(getExhibitorList());
        };
        fetchData();
    }, [dispatch]);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setContact({ ...contact, [name]: value });
        }
    };

    const handleInputChangeId = event => {
        if(event.target) {
            const { value } = event.target;
            setExhibitor(exhibitorList.data.find(e => e._id === value));
        }
    };
    const saveContact = () => {
        handleClose()
        dispatch(postContact(contact, exhibitor));
        setContact(initialContactState);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Ajouter un nouveau contact</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField name="contactLastname" label="Nom" value={contact.contactLastname} onChange={handleInputChange}/>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField name="contactFirstname" label="Prénom" value={contact.contactFirstname} onChange={handleInputChange}/>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField name="contactMobilePhone" label="Tél" value={contact.contactMobilePhone} onChange={handleInputChange}/>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField name="contactMail" label="Mél" value={contact.contactMail} onChange={handleInputChange}/>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField name="contactFunction" label="Fonction" value={contact.contactFunction} onChange={handleInputChange}/>
                        </Grid>
                        { exhibitorList.data &&
                        <Grid item xs={6}>
                            <FormControl style={{minWidth: "100%"}}>
                                <InputLabel id="exhibitor">Exposant</InputLabel>
                                <Select
                                    labelId="exhibitor"
                                    id="exhibitorNameSelect"
                                    name="_id"
                                    value={exhibitorList.data.find(e => e._id === exhibitor._id)._id}
                                    onChange={handleInputChangeId}
                                    displayEmpty
                                >
                                    {exhibitorList.data.map(e => <MenuItem value={e._id} key={e._id}>{e.exhibitorName}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <IconButton onClick={() => setAddExhibitor(true)}>
                                <Add/>
                            </IconButton>
                            {
                                addExhibitor && <AddExhibitor open={addExhibitor} handleClose={() => setAddExhibitor(false)}/>
                            }
                        </Grid>
                        }
                    </Grid>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={saveContact}>Ajouter</Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Annuler
                </Button>
            </DialogActions>
        </Dialog>

    );
}

export default AddContact;