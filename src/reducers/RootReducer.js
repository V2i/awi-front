import {combineReducers} from "redux";

import FestivalListReducer from "./FestivalListReducer";
import FestivalReducer from "./FestivalReducer";

import EditorListReducer from "./EditorListReducer";
import EditorReducer from "./EditorReducer";

import GameListReducer from "./GameListReducer";
import GameReducer from "./GameReducer";

const RootReducer = combineReducers({
    FestivalList: FestivalListReducer,
    Festival: FestivalReducer,

    GameList: GameListReducer,
    Game: GameReducer,

    EditorList: EditorListReducer,
    Editor: EditorReducer,

});

export default RootReducer;