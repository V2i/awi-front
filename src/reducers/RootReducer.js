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

// RESERVED GAME REDUCERS
import ReservedGameListReducer from "./ReservedGame/ReservedGameListReducer";

// ZONE REDUCERS
import ZoneListReducer from "./Zone/ZoneListReducer";

// CONTACT REDUCERS
import ContactListReducer from "./Contact/ContactListReducer";

// RESERVED GAME REDUCERS
import ReservedSpaceListReducer from "./ReservedSpace/ReservedSpaceListReducer";

// TRACKING REDUCERS
import TrackingListReducer from "./Tracking/TrackingListReducer";

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

    ReservationList: ReservationListReducer,
    Reservation: ReservationReducer,

    GameTypeList: GameTypeListReducer,

    UserList: UserListReducer,
    User: AuthReducer,

    ReservedGameList: ReservedGameListReducer,

    ZoneList: ZoneListReducer,

    ContactList: ContactListReducer,

    ReservedSpaceList: ReservedSpaceListReducer,

    TrackingList: TrackingListReducer
});

export default RootReducer;