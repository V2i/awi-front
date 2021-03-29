import {combineReducers} from "redux";

// FESTIVAL REDUCERS
import FestivalListReducer from "./Festival/FestivalListReducer";
import FestivalReducer from "./Festival/FestivalReducer";

// EDITOR REDUCERS
import EditorListReducer from "./Editor/EditorListReducer";
import EditorReducer from "./Editor/EditorReducer";
import EditorListFestivalReducer from "./Editor/EditorListFestivalReducer";

// EXHIBITOR REDUCERS
import ExhibitorListReducer from "./Exhibitor/ExhibitorListReducer";
import ExhibitorReducer from "./Exhibitor/ExhibitorReducer";

// GAME REDUCERS
import GameListReducer from "./Game/GameListReducer";
import GameReducer from "./Game/GameReducer";

// RESERVATION REDUCERS
import ReservationListReducer from "./Reservation/ReservationListReducer";
import ReservationReducer from "./Reservation/ReservationReducer";

// GAME TYPE REDUCERS
import GameTypeListReducer from "./GameType/GameTypeListReducer";
import GameTypeReducer from "./GameType/GameTypeReducer";

//USER REDUCERS
import UserListReducer from "./User/UserListReducer";
import AuthReducer from "./User/AuthReducer";

const RootReducer = combineReducers({
    FestivalList: FestivalListReducer,
    Festival: FestivalReducer,

    GameList: GameListReducer,
    Game: GameReducer,

    EditorList: EditorListReducer,
    EditorListFestival: EditorListFestivalReducer,
    Editor: EditorReducer,

    ExhibitorList: ExhibitorListReducer,
    Exhibitor: ExhibitorReducer,

    ReservationList: ReservationListReducer,
    Reservation: ReservationReducer,

    GameTypeList: GameTypeListReducer,
    GameType: GameTypeReducer,

    UserList: UserListReducer,
    User: AuthReducer,

});

export default RootReducer;