import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID} from "../actions/festivalActions";
import _ from "lodash";
import {NavLink} from "react-router-dom";

const Festival = (props) => {

    const festivalId = props._id;
    const dispatch = useDispatch();
    const festival = useSelector(state => state.Festival);

    React.useEffect(() => {
        dispatch(getFestivalByID(festivalId));
    }, []);

    const showData = () => {
        if(!_.isEmpty(festival.data)) {
            return <p>{festival.data.festivalName}</p>
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