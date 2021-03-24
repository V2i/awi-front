import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {Link} from "react-router-dom";
import Loading from "./Loading";
import {getExhibitorList} from "../actions/ExhibitorActions";

const ExhibitorList = () => {

    const dispatch = useDispatch();
    const exhibitorList = useSelector(state => state.ExhibitorList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getExhibitorList());
        };
        fetchData();
    }, [dispatch]);

    const showData = () => {
        if(!_.isEmpty(exhibitorList.data)) {
            return exhibitorList.data.map(f => {
                    return (<li key={f._id}>
                        <Link to={`/exhibitor/${f._id}`}>{f.exhibitorName}</Link>
                    </li>)
                }
            )
        }
        if(exhibitorList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(exhibitorList.errorMsg !== "") {
            return <p>{exhibitorList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            <h1>Liste des Exposants</h1>
            {showData()}
        </div>
    )
}

export default ExhibitorList;