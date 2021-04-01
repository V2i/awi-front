import React, {useState, useEffect} from 'react';
import {getZoneList} from "../../actions/ZoneActions";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Loading from "../Loading";
import AddIcon from '@material-ui/icons/Add';
import AddZone from "./AddZone";
import { IconButton, Button,
    Table, TableBody, TableCell, TableRow, TableHead, InputBase, Grid
} from "@material-ui/core";


const ZoneList = (props) => {
    const festivalId = props.festivalId;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const zoneList = useSelector(state => state.ZoneList);
    const user = useSelector(state => state.User);

    const searchInitialState ={
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);


    useEffect(() => {
        const fetchData = () => {
            dispatch(getZoneList(festivalId));
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
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell> </TableCell>
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
                        <TableCell><Link to={`/zone/${row.zone._id}`}><Button variant="outlined" color="primary">Détails</Button></Link></TableCell>
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
             <Grid container direction="column" justify="center"alignItems="center">
            <h1>Liste des zones</h1>
            {user.isLoggedIn
                ?
                    <IconButton aria-label="add" color="primary" onClick={() => changeValueOpen(true)}>
                        <AddIcon />
                    </IconButton>
                :
                    <></>
            }
            
            <InputBase  type="text" placeholder="Recherche..." onChange={(e)=>searchSpace(e)} />
            
            {showData()}
            { open && <AddZone open={open} handleClose={() => changeValueOpen(false)}/>}
            </Grid>
           
        </div>
    )
}

export default ZoneList;