import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import { IconButton, Paper, TextField,
    Table, TableBody, TableCell, TableRow, TableHead, Grid, TableContainer
} from "@material-ui/core";
import {getTrackingListByFestival} from "../../actions/TrackingActions";
import Tracking from "./Tracking";
import {getReservationByFestivalID} from "../../actions/ReservationActions";

const TrackingList = ({festivalId}) => {

    const dispatch = useDispatch();
    const reservationList = useSelector(state => state.ReservationList);
    const trackingList = useSelector(state => state.TrackingList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getTrackingListByFestival(festivalId));
            dispatch(getReservationByFestivalID(festivalId));
        };
        fetchData();
    }, [dispatch, festivalId]);

    const showData = () => {
        if(!_.isEmpty(trackingList.data)) {
            return (
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
                            {trackingList.data.map((row) => (
                                <Tracking tracking={row} key={row._id}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
        if(trackingList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(trackingList.errorMsg !== "") {
            return <p>{trackingList.errorMsg}</p>;
        }
        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <h1>Suivis</h1>
                {showData()}
            </Grid>
        </div>
    )
}

export default TrackingList;