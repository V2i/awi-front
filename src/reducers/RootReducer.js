import {combineReducers} from "redux";

// FESTIVAL REDUCERS
import FestivalListReducer from "./Festival/FestivalListReducer";
import FestivalReducer from "./Festival/FestivalReducer";
import AddFestivalReducer from "./Festival/AddFestivalReducer";

// EDITOR REDUCERS
import EditorListReducer from "./Editor/EditorListReducer";
import EditorReducer from "./Editor/EditorReducer";
import EditorListFestivalReducer from "./Editor/EditorListFestivalReducer";
import AddEditorReducer from "./Editor/AddEditorReducer";

// EXHIBITOR REDUCERS
import ExhibitorListReducer from "./Exhibitor/ExhibitorListReducer";
import ExhibitorReducer from "./Exhibitor/ExhibitorReducer";

// GAME REDUCERS
import GameListReducer from "./Game/GameListReducer";
import GameReducer from "./Game/GameReducer";

// RESERVATION REDUCERS
import ReservationListReducer from "./Reservation/ReservationListReducer";
import ReservationReducer from "./Reservation/ReservationReducer";

const RootReducer = combineReducers({
    FestivalList: FestivalListReducer,
    Festival: FestivalReducer,
    AddFestival: AddFestivalReducer,

    GameList: GameListReducer,
    Game: GameReducer,

    EditorList: EditorListReducer,
    EditorListFestival: EditorListFestivalReducer,
    Editor: EditorReducer,
    AddEditor: AddEditorReducer,

    ExhibitorList: ExhibitorListReducer,
    Exhibitor: ExhibitorReducer,

    ReservationList: ReservationListReducer,
    Reservation: ReservationReducer,
});

export default RootReducer;