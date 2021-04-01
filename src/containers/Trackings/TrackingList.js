import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import Loading from "../Loading";
import { IconButton, Paper, TextField,
    Table, TableBody, TableCell, TableRow, TableHead, Grid, TableContainer
} from "@material-ui/core";
import {getTrackingListByFestival} from "../../actions/TrackingActions";
import Tracking from "./Tracking";

const TrackingList = ({festivalId}) => {

    const initTracking = {
        trackingWorkflow: "",
        trackingContact1: "",
        trackingContact2: "",
        trackingCR: ""
    };

    const [selectedTracking, setTracking] = useState(initTracking);
    const dispatch = useDispatch();
    const trackingList = useSelector(state => state.TrackingList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getTrackingListByFestival(festivalId));
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
                                <TableCell>Workflow</TableCell>
                                <TableCell>Contact 1</TableCell>
                                <TableCell>Contact 2</TableCell>
                                <TableCell>CR</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trackingList.data.map((row) => (
                                <Tracking tracking={row} />
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