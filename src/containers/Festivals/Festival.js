import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID} from "../../actions/FestivalActions";
import _ from "lodash";
import Loading from "../Loading";
import FestivalCard from './FestivalCard';
import ReservedGameByFestival from "../ReservedGames/ReservedGameByFestival";
import ReservationList from "../Reservations/ReservationList";
import Grid from "@material-ui/core/Grid"
import ZoneList from "../Zones/ZoneList";
import BillingList from "../Billings/BillingList";

const Festival = (props) => {

    const festivalId = props.match.params.id;
    const dispatch = useDispatch();
    const festival = useSelector(state => state.Festival);

    React.useEffect(() => {
        dispatch(getFestivalByID(festivalId));
    }, [dispatch, festivalId]);

    const showData = () => {
        if(!_.isEmpty(festival.data)) {
            return (
                <Grid container spacing={3}>
                    <Grid item xs ={8}>
                    <FestivalCard festival={festival.data} />
                    </Grid>
                    <Grid item xs={4}>
                        <ReservedGameByFestival festivalId={festival.data._id} />
                    </Grid>
                    <Grid item xs={8}>
                        <ReservationList festivalId={festival.data._id} />
                    </Grid>
                    <Grid item xs={4}>
                        <ZoneList festivalId={festival.data._id} />
                    </Grid>
                    <Grid item xs={8}>
                        <BillingList festivalId={festival.data._id} />
                    </Grid>
                </Grid>
            )
        }
        if(festival.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(festival.errorMsg !== "") {
            return <p>{festival.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Festival;