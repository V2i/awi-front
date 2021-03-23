import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getFestivalList} from "../actions/festivalActions";
import {NavLink} from "react-router-dom";

const FestivalList = () => {

    const dispatch = useDispatch();
    const festivalList = useSelector(state => state.FestivalList);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        dispatch(getFestivalList());
    }

    const showData = () => {
        if(!_.isEmpty(festivalList.data)) {
            return festivalList.data.map(f => {
                return (<li>
                    <NavLink to={`/festival/${f._id}`}>{f.festivalName}</NavLink>
                </li>)
            }
            )
        }
        if(festivalList.loading) {
            return <p>loading...</p>;
        }
        if(festivalList.errorMsg !== "") {
            return <p>{festivalList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            <h1>Liste de Festivaux</h1>
            {showData()}
        </div>
    )
}

export default FestivalList;