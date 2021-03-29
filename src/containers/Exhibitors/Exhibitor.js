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

const Exhibitor = (props) => {

    const exhibitorId = props.match.params.id;
    const dispatch = useDispatch();
    const exhibitor = useSelector(state => state.Exhibitor);

    React.useEffect(() => {
        dispatch(getExhibitorByID(exhibitorId));
    }, [dispatch, exhibitorId]);

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
                                <TableCell>Téléphone 1</TableCell>
                                <TableCell>Téléphone 2</TableCell>
                                <TableCell>Mail</TableCell>
                                <TableCell>Fonction</TableCell>
                                <TableCell>Principal ?</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {exhibitor.data.exhibitorContact && exhibitor.data.exhibitorContact.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">{row.contactLastname}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactFirstname}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactPhone}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactMobilePhone}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactMail}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactFunction}</TableCell>
                                    <TableCell component="th" scope="row">{row.contactMain ? 'Oui' : 'Non'}</TableCell>
                                </TableRow>
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