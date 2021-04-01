import React from 'react';
import { Paper, Table, TableBody, TableCell, TableRow, TableHead, Grid, TableContainer
} from "@material-ui/core";
import Tracking from "./Tracking";
import {makeStyles} from "@material-ui/core/styles";

const TrackingCard = ({tracking}) => {

    return(
        <>
            <h1>Suivi</h1>
            <TableContainer component={Paper}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{'font-weight':'bold'}}>Exposant</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Workflow</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Contact 1</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Contact 2</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>CR</TableCell>
                            <TableCell style={{'font-weight':'bold'}}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Tracking tracking={tracking}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TrackingCard;