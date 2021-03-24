import {combineReducers} from "redux";

import FestivalListReducer from "./FestivalListReducer";
import FestivalReducer from "./FestivalReducer";

import GameListReducer from "./GameListReducer";
import GameReducer from "./GameReducer";

const RootReducer = combineReducers({
    FestivalList: FestivalListReducer,
    Festival: FestivalReducer,
    GameList: GameListReducer,
    Game: GameReducer,
});

export default RootReducer;