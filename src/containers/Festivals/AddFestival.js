import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFestivalByID, getFestivalList, postFestival} from "../../actions/FestivalActions";
import moment from "moment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker} from "@material-ui/pickers";

const AddFestival = () => {

    const initialFestivalState = {
        festivalName: "",
        festivalDate: moment(),
        festivalSpace: [],
    };

    const dispatch = useDispatch();
    const [festival, setFestival] = useState(initialFestivalState);

    const handleInputChange = event => {
        if(event.target) {
            const { name, value } = event.target;
            setFestival({ ...festival, [name]: value });
        } else {
            setFestival({...festival, festivalDate: event});
        }
    };

    const saveFestival = () => {
        const data = {
            festivalName: festival.festivalName,
            festivalDate: festival.festivalDate,
            festivalSpace: festival.festivalSpace
        };
        dispatch(postFestival(data));
    };

    return(
        <div>
            <form>
                <TextField name="festivalName" label="Nom" value={festival.festivalName} onChange={handleInputChange}/>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd MM YYYY"
                    margin="normal"
                    id="date-picker"
                    label="Date picker inline"
                    value={festival.festivalDate}
                    onChange={handleInputChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <Button variant="contained" color="primary" onClick={saveFestival}>Ajouter</Button>
            </form>
        </div>
    );
}

export default AddFestival;