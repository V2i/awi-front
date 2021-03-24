import {combineReducers} from "redux";
import FestivalListReducer from "./FestivalListReducer";
import FestivalReducer from "./FestivalReducer";
import EditorListReducer from "./EditorListReducer";
import EditorReducer from "./EditorReducer";

const RootReducer = combineReducers({
    FestivalList: FestivalListReducer,
    Festival: FestivalReducer,
    EditorList: EditorListReducer,
    Editor: EditorReducer,
});

export default RootReducer;