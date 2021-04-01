import React, {useState, useEffect} from 'react';
import {getZoneList} from "../../actions/ZoneActions";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Loading from "../Loading";
import { Button,
    Table, TableBody, TableCell, TableRow, TableHead
} from "@material-ui/core";


const ZoneList = () => {
    
    const dispatch = useDispatch();
    const zoneList = useSelector(state => state.ZoneList);

    const searchInitialState ={
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);


    useEffect(() => {
        const fetchData = () => {
            dispatch(getZoneList());
        };
        fetchData();
    }, [dispatch]);

    const searchSpace = (event)=>{
        let keyword = event.target.value;
        setState({search:keyword})
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
                            else if(data.zoneName.toLowerCase().includes(searchState.search.toLowerCase())){
                                return data
                            }
                            })
                    .map((row) => (
                        <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                            {row.zoneName}
                        </TableCell>
                        <TableCell><Link to={`/zone/${row._id}`}><Button variant="outlined" color="primary">Détails</Button></Link></TableCell>
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

        return <p>Impossible d'obtenir des données</p>;
    }

    return (
        <div>
            {showData()}
           
        </div>
    )
}

export default ZoneList;