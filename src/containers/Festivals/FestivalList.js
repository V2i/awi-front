import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getFestivalList} from "../../actions/FestivalActions";
import {Link} from "react-router-dom";
import Loading from "../Loading";
import { Grid } from "@material-ui/core";
import FestivalCard from './FestivalCard';

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
            return (
                <Grid
                    container
                    direction="row"
                    spacing = {3}
                    >
                        
                        { festivalList.data.map(f => 
                            <Grid item xs={6}>
                                <FestivalCard festival = {f} /> 
                            </Grid>
                        )}
                        
                        
                </Grid>
            
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