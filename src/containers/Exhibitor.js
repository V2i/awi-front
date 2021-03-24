import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getExhibitorByID} from "../actions/ExhibitorAction";
import _ from "lodash";
import Loading from "./Loading";

const Exhibitor = (props) => {

    const exhibitorId = props.match.params.id;
    const dispatch = useDispatch();
    const exhibitor = useSelector(state => state.Exhibitor);

    React.useEffect(() => {
        dispatch(getExhibitorByID(exhibitorId));
    }, [dispatch, exhibitorId]);

    const showData = () => {
        if(!_.isEmpty(exhibitor.data)) {
            return <h1>{exhibitor.data.exhibitorName}</h1>
        }
        if(exhibitor.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(exhibitor.errorMsg !== "") {
            return <p>{exhibitor.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Exhibitor;