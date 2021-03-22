import {combineReducers} from "redux";
import FestivalListReducer from "./FestivalListreducer";

const RootReducer = combineReducers({
    festivalList: FestivalListReducer
});

export default RootReducer;