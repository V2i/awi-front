import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import { Paper,
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer
} from "@material-ui/core";
import {getTrackingListByFestival} from "../../actions/TrackingActions";
import Tracking from "./Tracking";
import {getReservationByFestivalID} from "../../actions/ReservationActions";

const TrackingList = ({festivalId}) => {

    const dispatch = useDispatch();
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
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Exposant</TableCell>
                                <TableCell>Workflow</TableCell>
                                <TableCell>Contact 1</TableCell>
                                <TableCell>Contact 2</TableCell>
                                <TableCell>CR</TableCell>
                                <TableCell> </TableCell>
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
            <Paper>
                <h3>Suivis</h3>
                {showData()}
            </Paper>
        </div>
    )
}

export default TrackingList;