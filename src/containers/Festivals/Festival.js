import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID} from "../../actions/FestivalActions";
import _ from "lodash";
import Loading from "../Loading";
import FestivalCard from './FestivalCard';

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
                <FestivalCard festival={festival.data} />
            );
        }
        if(festival.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(festival.errorMsg !== "") {
            return <p>{festival.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Festival;