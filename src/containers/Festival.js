import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID} from "../actions/festivalActions";
import _ from "lodash";

const Festival = (props) => {

    const festivalId = props.match.params.id;
    const dispatch = useDispatch();
    const festival = useSelector(state => state.Festival);

    React.useEffect(() => {
        dispatch(getFestivalByID(festivalId));
    }, [dispatch, festivalId]);

    const showData = () => {
        if(!_.isEmpty(festival.data)) {
            return <h1>{festival.data.festivalName}</h1>
        }
        if(festival.loading) {
            return <p>loading...</p>;
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