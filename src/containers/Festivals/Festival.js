import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID} from "../../actions/FestivalActions";
import _ from "lodash";
import Loading from "../Loading";
import FestivalCard from './FestivalCard';
import ZoneList from "../Zones/ZoneList";

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
                <>
                <FestivalCard festival={festival.data} />
                <ZoneList festivalId={festivalId}/>
                </>
            );
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