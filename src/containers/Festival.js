import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID} from "../actions/FestivalActions";
import _ from "lodash";
import Loading from "./Loading";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/FormCheck"
import moment from 'moment';

const Festival = (props) => {

    const festivalId = props.match.params.id;
    const dispatch = useDispatch();
    const festival = useSelector(state => state.Festival);

    React.useEffect(() => {
        dispatch(getFestivalByID(festivalId));
    }, [dispatch, festivalId]);

    const showData = () => {
        if(!_.isEmpty(festival.data)) {
            return (
                <Card>
                    <Card.Header>{moment(festival.data.festivalDate).format("Do MMM YY")}</Card.Header>
                    <Card.Body>
                        <Card.Title>{festival.data.festivalName}</Card.Title>
                        <Card.Text>
                            allo
                        </Card.Text>
                        {/*<Form.Check type="checkbox" label="Festival Courant" defaultChecked={festival.data.isCurrent}/>*/}
                    </Card.Body>
                </Card>
            );
        }
        if(festival.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />
        }
        if(festival.errorMsg !== "") {
            return <p>{festival.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return(
        <div>
            {showData()}
        </div>
    )
}

export default Festival;