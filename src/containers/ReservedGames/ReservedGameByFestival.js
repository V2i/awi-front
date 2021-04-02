import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getReservedGameListByFestival } from "../../actions/ReservedGameActions";
import { makeStyles } from '@material-ui/core/styles';
import { Visibility } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { 
    Table, TableBody, TableCell, TableRow, TableHead, Paper, TableContainer, TablePagination
 } from "@material-ui/core";
 import {Link} from 'react-router-dom';


const ReservedGameByFestival = ({festivalId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.User);
    const reservedGameList = useSelector(state => state.ReservedGameList);
    
    React.useEffect(() => {
        dispatch(getReservedGameListByFestival(festivalId));
    }, [dispatch, festivalId]);
    
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

    return (
        <Paper className={classes.root}>
            <h3>Jeux réservés</h3>
        <TableContainer className={classes.container}>
            <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell style={{'font-weight':'bold'}}>Nom</TableCell>
                    <TableCell style={{'font-weight':'bold'}}>Editeur</TableCell>
                    <TableCell> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {reservedGameList.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(reserv => 
                reserv.reservationReservedGame.map(row => 
                <TableRow key={row._id}>
                    <TableCell>
                        { row.reservedGame.gameName }
                    </TableCell>
                    <TableCell>
                        { row.reservedGame.gameEditor &&row.reservedGame.gameEditor.editorName }
                    </TableCell>
                    
                    

                    {user.isLoggedIn
                        ?
                            <TableCell>
                                <IconButton variant="outlined" color="primary" component={Link} to={`/reservation/${reserv._id}`}><Visibility /></IconButton>
                            </TableCell>
                        :
                            <></>
                    }
                </TableRow>
                )
            )}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={reservedGameList.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
        
    )
            
}

export default ReservedGameByFestival;