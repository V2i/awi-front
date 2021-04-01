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
import AddExhibitorReducer from "./Exhibitor/AddExhibitorReducer";

// ZONE REDUCERS
import ZoneListReducer from "./Zone/ZoneListReducer";

// GAME REDUCERS
import GameListReducer from "./Game/GameListReducer";
import GameReducer from "./Game/GameReducer";

// RESERVATION REDUCERS
import ReservationListReducer from "./Reservation/ReservationListReducer";
import ReservationReducer from "./Reservation/ReservationReducer";

// GAME TYPE REDUCERS
import GameTypeListReducer from "./GameType/GameTypeListReducer";

// USER REDUCERS
import UserListReducer from "./User/UserListReducer";
import AuthReducer from "./User/AuthReducer";

// CONTACT REDUCERS
import ContactListReducer from "./Contact/ContactListReducer";

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
    AddExhibitor: AddExhibitorReducer,

    ZoneList: ZoneListReducer,

    ReservationList: ReservationListReducer,
    Reservation: ReservationReducer,

    GameTypeList: GameTypeListReducer,

    UserList: UserListReducer,
    User: AuthReducer,

    ContactList: ContactListReducer

});

export default RootReducer;