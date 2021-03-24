import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGameByID} from "../actions/gameActions";
import _ from "lodash";
import Loading from "./Loading";

const Game = (props) => {

    const gameId = props.match.params.id;
    const dispatch = useDispatch();
    const game = useSelector(state => state.Game);

    React.useEffect(() => {
        dispatch(getGameByID(gameId));
    }, [dispatch, gameId]);

    const showData = () => {
        if(!_.isEmpty(game.data)) {
            return <h1>{game.data.gameName}</h1>
        }
        if(game.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(game.errorMsg !== "") {
            return <p>{game.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Game;