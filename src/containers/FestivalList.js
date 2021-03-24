import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getFestivalList} from "../actions/FestivalActions";
import {Link} from "react-router-dom";
import Loading from "./Loading";

const FestivalList = () => {

    const dispatch = useDispatch();
    const festivalList = useSelector(state => state.FestivalList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getFestivalList());
        };
        fetchData();
    }, [dispatch]);

    const showData = () => {
        if(!_.isEmpty(festivalList.data)) {
            return festivalList.data.map(f => {
                    return (<li key={f._id}>
                        <Link to={`/festival/${f._id}`}>{f.festivalName}</Link>
                    </li>)
                }
            )
        }
        if(festivalList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(festivalList.errorMsg !== "") {
            return <p>{festivalList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            <h1>Liste des Festivals</h1>
            {showData()}
        </div>
    )
}

export default FestivalList;