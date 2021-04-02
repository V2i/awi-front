import React, {useState, useEffect} from 'react';
import {getZoneListByFestival} from "../../actions/ZoneActions";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Loading from "../Loading";
import AddZone from "./AddZone";
import { Button, Paper,
    Table, TableBody, TableCell, TableRow, TableHead, InputBase
} from "@material-ui/core";
import {Visibility} from "@material-ui/icons";


const ZoneList = (props) => {
    const festivalId = props.festivalId;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const zoneList = useSelector(state => state.ZoneList);

    const searchInitialState ={
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);


    useEffect(() => {
        const fetchData = () => {
            dispatch(getZoneListByFestival(festivalId));
        };
        fetchData();
    }, [dispatch]);

    const searchSpace = (event)=>{
        let keyword = event.target.value;
        setState({search:keyword})
    }

    const changeValueOpen = (value) => {
        setOpen(value)
    }

    const showData = () => {
        if(!_.isEmpty(zoneList.data)) {
            return (
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{'font-weight':'bold'}}>Nom</TableCell>
                            <TableCell style={{'font-weight':'bold'}}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {zoneList.data.filter((data) => {
                            if(searchState.search == null)
                                return data
                            else if(data.zone.zoneName.toLowerCase().includes(searchState.search.toLowerCase())){
                                return data
                            }
                            })
                    .map((row) => (
                        <TableRow key={row.zone._id}>
                        <TableCell component="th" scope="row">
                            {row.zone.zoneName}
                        </TableCell>
                            <TableCell>
                                <IconButton variant="outlined" color="primary" component={Link} to={`/festival/${festivalId}/zone/${row.zone._id}`}><Visibility /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            )
        }
        if(zoneList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(zoneList.errorMsg !== "") {
            return <p>{zoneList.errorMsg}</p>;
        }

        return <p>Pas de données</p>;
    }

    return (
        <div>
             <Paper>
            <h3>Liste des zones</h3>

            
            <InputBase  type="text" placeholder="Recherche..." onChange={(e)=>searchSpace(e)} />
            
            {showData()}
            { open && <AddZone open={open} handleClose={() => changeValueOpen(false)}/>}
            </Paper>
           
        </div>
    )
}

export default ZoneList;