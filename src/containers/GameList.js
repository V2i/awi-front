import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getGameList} from "../actions/gameActions";
import {Link} from "react-router-dom";
import Loading from "./Loading";

const GameList = () => {

    const dispatch = useDispatch();
    const gameList = useSelector(state => state.GameList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getGameList());
        };
        fetchData();
    }, [dispatch]);

    const showData = () => {
        if(!_.isEmpty(gameList.data)) {
            return gameList.data.map(g => {
                return (<li key={g._id}>
                    <Link to={`/game/${g._id}`}>{g.gameName}</Link>
                </li>)
            }
            )
        }
        if(gameList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(gameList.errorMsg !== "") {
            return <p>{gameList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            <h1>Liste des Jeux</h1>
            {showData()}
        </div>
    )
}

export default GameList;