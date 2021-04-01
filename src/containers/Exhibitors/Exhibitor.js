import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getExhibitorByID} from "../../actions/ExhibitorActions";
import _ from "lodash";
import Loading from "../Loading";
import { 
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Paper, Button, Typography, Grid,
  } from "@material-ui/core";
import {Link} from 'react-router-dom';
import ExhibitorContact from "./ExhibitorContact";
import {patchContact} from "../../actions/ContactActions";

const Exhibitor = (props) => {

    const [open, setOpen ] = React.useState(false);
    const exhibitorId = props.match.params.id;
    const dispatch = useDispatch();
    const exhibitor = useSelector(state => state.Exhibitor);
    const contactList = useSelector(state => state.ContactList);

    React.useEffect(() => {
        dispatch(getExhibitorByID(exhibitorId));
    }, [dispatch, exhibitorId]);

    const saveContact = (selectedContact) => {
        dispatch(patchContact(selectedContact));
    };

    const showData = () => {
        if(!_.isEmpty(exhibitor.data)) {
            return (
                <Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h3">{exhibitor.data.exhibitorName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography>Relié à un éditeur ? {exhibitor.data.exhibitorEditor ? <Link to={`/editor/${exhibitor.data.exhibitorEditor._id}`}><Button variant="outlined">{exhibitor.data.exhibitorEditor.editorName}</Button></Link> : 'Non'}</Typography>
                        </Grid>
                        
                    </Grid>
                    
                    <Typography><b>Contacts :</b></Typography>
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
                            {exhibitor.data.exhibitorContact && exhibitor.data.exhibitorContact.map(contact => (
                                <ExhibitorContact contact={contact} exhibitor={exhibitor} key={contact._id}/>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )
        }
        if(exhibitor.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(exhibitor.errorMsg !== "") {
            return <p>{exhibitor.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Exhibitor;