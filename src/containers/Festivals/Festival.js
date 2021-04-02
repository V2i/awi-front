import React from 'react';
import { useSelector} from "react-redux";
import _ from "lodash";
import Loading from "../Loading";
import FestivalCard from './FestivalCard';
import ReservedGameByFestival from "../ReservedGames/ReservedGameByFestival";
import ReservationList from "../Reservations/ReservationList";
import Grid from "@material-ui/core/Grid"
import ZoneList from "../Zones/ZoneList";
import TrackingList from "../Trackings/TrackingList";
import BillingList from "../Billings/BillingList";

const Festival = (props) => {

    const festivalId = props.match.params.id;
    const festival = useSelector(state => state.Festival);
    const user = useSelector(state => state.User);

    const showData = () => {
        if(!_.isEmpty(festival.data)) {
            return (
                <div>
                { user.isLoggedIn
                    ?
                    <Grid container spacing={3}>
                        <Grid item xs ={8}>
                            <FestivalCard festival={festival.data} />
                        </Grid>
                        <Grid item xs={4}>
                            <ReservedGameByFestival festivalId={festivalId} />
                        </Grid>
                        <Grid item xs={8}>
                            <ReservationList festivalId={festivalId} />
                        </Grid>
                        <Grid item xs={4}>
                            <ZoneList festivalId={festivalId} />
                        </Grid>
                        <Grid item xs={6}>
                            <BillingList festivalId={festivalId} />
                        </Grid>
                        <Grid item xs={6}>
                            <TrackingList festivalId={festival.data._id} />
                        </Grid>
                    </Grid>
                    : <ReservedGameByFestival festivalId={festivalId} />
                }
                </div>
                
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
            <h1>{festival.data.festivalName}</h1>
            {showData()}
        </div>
    )
}

export default Festival;