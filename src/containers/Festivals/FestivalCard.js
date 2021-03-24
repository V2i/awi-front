import React from 'react';
import { 
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer,
    Checkbox, 
    Typography, 
    Paper,
    Card,
    FormControlLabel,
    Button,
  } from "@material-ui/core";
import moment from 'moment';

const FestivalCard = ({festival}) => {

    const handleChange = (event) => {
        festival[event.target.name] = event.target.value;
        //TODO : Use patch to change value
    };

    return(
        <Card>
            <Typography variant="h5">{festival.festivalName}</Typography>
            <Typography>{moment(festival.festivalDate).format('DD/MM/YYYY')}</Typography>

            <FormControlLabel
                control={<Checkbox checked={festival.isCurrent} onChange={handleChange} name="isCurrent" />}
                label="Courant ?"
            />

            <Button variant="contained" color="primary" href={`${festival._id}`}>
                Voir
            </Button>

            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Espace</TableCell>
                        <TableCell align="right">Nb Tables</TableCell>
                        <TableCell align="right">Prix Table (en €)</TableCell>
                        <TableCell align="right">Prix m2 (en €)</TableCell>
                        <TableCell align="right">Tables réservés</TableCell>
                        <TableCell align="right">m2 réservés</TableCell>
                        <TableCell align="right">Restants</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {festival.festivalSpace.map(row => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.spaceName}
                            </TableCell>
                            <TableCell align="right">{row.spaceNbTable}</TableCell>
                            <TableCell align="right">{row.spacePriceTable}</TableCell>
                            <TableCell align="right">{row.spacePriceSurface}</TableCell>
                            <TableCell align="right">Res</TableCell>
                            <TableCell align="right">Res</TableCell>
                            <TableCell align="right">Res</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        
        </Card>
        
    
    )

}

export default FestivalCard;