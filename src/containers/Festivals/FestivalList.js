import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getFestivalList} from "../../actions/FestivalActions";
import Loading from "../Loading";
import { Grid, IconButton} from "@material-ui/core";
import FestivalCard from './FestivalCard';
import AddFestival from "./AddFestival";
import AddIcon from '@material-ui/icons/Add';

const FestivalList = () => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const festivalList = useSelector(state => state.FestivalList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getFestivalList());
        };
        fetchData();
    }, [dispatch]);

    const changeValueOpen = (value) => {
        setOpen(value)
    }

    const showData = () => {
        if(!_.isEmpty(festivalList.data)) {
            return (
                <Grid
                    container
                    direction="row"
                    spacing = {3}
                    alignItems="center"
                    alignContent="center"
                    justify="center"
                    >
                        
                        { festivalList.data.map(f => 
                            <Grid item xs={10} key={f._id}>
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

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            <h1>Liste des Festivals</h1>
            <IconButton aria-label="add" color="primary" onClick={() => changeValueOpen(true)}>
                <AddIcon />
            </IconButton>
            {showData()}
            <AddFestival open={open} handleClose={() => changeValueOpen(false)}/>
        </div>
    )
}

export default FestivalList;