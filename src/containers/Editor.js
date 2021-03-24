import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getEditorByID} from "../actions/EditorActions";
import _ from "lodash";
import Loading from "./Loading";

const Editor = (props) => {

    const editorId = props.match.params.id;
    const dispatch = useDispatch();
    const editor = useSelector(state => state.Editor);

    React.useEffect(() => {
        dispatch(getEditorByID(editorId));
    }, [dispatch, editorId]);

    const showData = () => {
        if(!_.isEmpty(editor.data)) {
            return <h1>{editor.data.editorName}</h1>
        }
        if(editor.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(editor.errorMsg !== "") {
            return <p>{editor.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Editor;