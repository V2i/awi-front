import {combineReducers} from "redux";
import FestivalListReducer from "./FestivalListReducer";
import FestivalReducer from "./FestivalReducer";

const RootReducer = combineReducers({
    FestivalList: FestivalListReducer,
    Festival: FestivalReducer,
});

export default RootReducer;