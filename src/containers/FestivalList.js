import React from 'react';
import {useDispatch, useSelector} from "react-redux";

const FestivalList = () => {

    const dispatch = useDispatch();
    const festivalList = useSelector(state => state.FestivalList);

    return(
        <div>
            <h1>Liste de Festivaux</h1>
        </div>
    )
}

export default FestivalList;