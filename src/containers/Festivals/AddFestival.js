import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID, postFestival} from "../../actions/FestivalActions";
import moment from "moment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker} from "@material-ui/pickers";

const AddFestival = () => {

    const initialFestivalState = {
        festivalName: "",
        festivalDate: moment().format("Do MMM YYYY"),
        festivalSpace: [],
    };

    const dispatch = useDispatch();
    const [festival, setFestival] = useState(initialFestivalState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFestival({ ...festival, [name]: value });
    };

    const saveFestival = () => {
        const data = {
            festivalName: festival.festivalName,
            festivalDate: festival.festivalDate,
            festivalSpace: festival.festivalSpace
        };
        dispatch(postFestival(data));
    }

    return(
        <div>
            <form>
                <TextField id="festivalName" label="Name of the Festival" value={festival.festivalName} onChange={handleInputChange}/>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker"
                    label="Date picker inline"
                    value={festival.festivalDate}
                    onChange={handleInputChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <Button variant="contained" color="primary" onClick={saveFestival()}>Ajouter</Button>
            </form>
        </div>
    );
}

export default AddFestival;