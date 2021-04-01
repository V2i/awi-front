import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {getReservationList, deleteReservation, getReservationByFestivalID} from "../../actions/ReservationActions";
import {
    Table, TableBody, TableCell, TableRow, TableHead, TableContainer, Paper, Grid, InputBase, TablePagination
} from "@material-ui/core";
import {Link} from "react-router-dom";
import Loading from "../Loading";
import IconButton from "@material-ui/core/IconButton";
import {Add, Create, Delete, Visibility} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import AddReservation from "./AddReservation";
import { makeStyles } from '@material-ui/core/styles';

const ReservationList = ({festivalID = false}) => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const reservationList = useSelector(state => state.ReservationList);
    const user = useSelector(state => state.User);

    const searchInitialState ={
        search: "",
    }

    const [searchState, setState] = useState(searchInitialState);

    React.useEffect(() => {
        const fetchData = () => {
            if (!festivalID){
                dispatch(getReservationList());
            }
            else{
                dispatch(getReservationByFestivalID(festivalID));
            }
            
        };
        fetchData();
    }, [dispatch]);

    const removeReservation = (id) => {
        dispatch(deleteReservation(id));
    };

    const changeValueOpen = (value) => {
        setOpen(value)
    };

    const searchSpace = (event)=>{
        let keyword = event.target.value;
        setState({search:keyword})
      }

      
    const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 500,
        },
      });

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const showData = () => {
        if(!_.isEmpty(reservationList.data)) {
            return (
                <>
                <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{'font-weight':'bold'}}>Exposant</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Se Deplace?</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Besoin de Volontaire?</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Montant €</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Facturation</TableCell>
                            <TableCell style={{'font-weight':'bold'}}>Suivi</TableCell>
                            <TableCell style={{'font-weight':'bold'}}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {reservationList.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((data) => {
                        if(searchState.search == null)
                            return data
                        else if(data.reservationExhibitor.exhibitorName.toLowerCase().includes(searchState.search.toLowerCase())){
                            return data
                        }
                        })
                        
                        .map(row => (
                            <TableRow key={row._id}>
                                <TableCell>{row.reservationExhibitor && row.reservationExhibitor.exhibitorName}</TableCell>
                                <TableCell>{row.exhibitorIsMoving}</TableCell>
                                <TableCell>{row.exhibitorVolunteerNeeded}</TableCell>
                                <TableCell>{row.reservationBilling && row.reservationBilling.billingAmount}</TableCell>
                                <TableCell>{row.reservationBilling && row.reservationBilling.billingStatus}</TableCell>
                                <TableCell>{row.reservationBilling && row.reservationTracking.trackingWorkflow}</TableCell>
                                <TableCell>
                                    <IconButton variant="outlined" color="primary" component={Link} to={`/reservation/${row._id}`}><Visibility /></IconButton>
                                    <IconButton variant="outlined" style={{ color: green[500] }} ><Create /></IconButton>
                                    <IconButton variant="outlined" color="secondary" onClick={() => removeReservation(row._id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={reservationList.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>
            </>
            )
        }
        if(reservationList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(reservationList.errorMsg !== "") {
            return <p>{reservationList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
             <Grid container direction="column" justify="center" alignItems="center">
            {user.isLoggedIn
                ? <div>
                    <h1>Liste des Reservations</h1>
                    
                        
                    
                    <IconButton variant="outlined" color="primary" onClick={() => changeValueOpen(true)}><Add /></IconButton>
                    <InputBase  type="text" placeholder="Recherche..." onChange={(e)=>searchSpace(e)} />
                    {showData()}
                    <AddReservation open={open} handleClose={() => changeValueOpen(false)}/>
                </div>
                :<p>Vous n'avez pas la permission requise!</p>
            }
            </Grid>
        </div>
    )
}

export default ReservationList;