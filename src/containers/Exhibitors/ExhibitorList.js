import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import {getExhibitorList} from "../../actions/ExhibitorActions";
import { 
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Paper, Button
  } from "@material-ui/core";

const ExhibitorList = () => {

    const dispatch = useDispatch();
    const exhibitorList = useSelector(state => state.ExhibitorList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getExhibitorList());
        };
        fetchData();
    }, [dispatch]);

    const showData = () => {
        if(!_.isEmpty(exhibitorList.data)) {
            return (
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell align="right">Est Editeur ?</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {exhibitorList.data.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.exhibitorName}
                                </TableCell>
                                <TableCell align="right">{row.exhibitorEditor ? <Button  variant="outlined" href={`/editor/${row.exhibitorEditor._id}`}>{row.exhibitorEditor.editorName}</Button>: 'Non'}</TableCell>
                                <TableCell><Button href={`/exhibitor/${row._id}`}>Détails</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
            <h1>Liste des Exposants</h1>
            {showData()}
        </div>
    )
}

export default ExhibitorList;