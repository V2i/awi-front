import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getEditorList} from "../actions/EditorActions";
import {Link} from "react-router-dom";
import Loading from "./Loading";

const EditorList = () => {

    const dispatch = useDispatch();
    const editorList = useSelector(state => state.EditorList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getEditorList());
        };
        fetchData();
    }, [dispatch]);

    const showData = () => {
        if(!_.isEmpty(editorList.data)) {
            return editorList.data.map(f => {
                    return (<li key={f._id}>
                        <Link to={`/editor/${f._id}`}>{f.editorName}</Link>
                    </li>)
                }
            )
        }
        if(editorList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(editorList.errorMsg !== "") {
            return <p>{editorList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            <h1>Liste des Editeurs</h1>
            {showData()}
        </div>
    )
}

export default EditorList;