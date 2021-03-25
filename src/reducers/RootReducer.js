import {combineReducers} from "redux";

import FestivalListReducer from "./Festival/FestivalListReducer";
import FestivalReducer from "./Festival/FestivalReducer";

import EditorListReducer from "./EditorListReducer";
import EditorReducer from "./EditorReducer";

import ExhibitorListReducer from "./ExhibitorListReducer";
import ExhibitorReducer from "./ExhibitorReducer";

import GameListReducer from "./GameListReducer";
import GameReducer from "./GameReducer";

import ReservationListReducer from "./ReservationListReducer";
import ReservationReducer from "./ReservationReducer";
import EditorListFestivalReducer from "./EditorListFestivalReducer";
import AddFestivalReducer from "./Festival/AddFestivalReducer";

const RootReducer = combineReducers({
    FestivalList: FestivalListReducer,
    Festival: FestivalReducer,
    AddFestival: AddFestivalReducer,

    GameList: GameListReducer,
    Game: GameReducer,

    EditorList: EditorListReducer,
    EditorListFestival: EditorListFestivalReducer,
    Editor: EditorReducer,

    ExhibitorList: ExhibitorListReducer,
    Exhibitor: ExhibitorReducer,

    ReservationList: ReservationListReducer,
    Reservation: ReservationReducer,
});

export default RootReducer;