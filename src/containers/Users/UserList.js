import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import {deleteUser, getUserList} from "../../actions/UserActions";
import Loading from "../Loading";
import {
    Checkbox,
    FormControlLabel,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddUser from "../Users/AddUser";
import DeleteIcon from "@material-ui/icons/Delete";

const UserList = () => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const userList = useSelector(state => state.UserList);

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(getUserList());
        };
        fetchData();
    }, [dispatch]);

    const changeValueOpen = (value) => {
        setOpen(value)
    };

    const removeUser = (id) => {
        dispatch(deleteUser(id));
    }

    const showData = () => {
        if(!_.isEmpty(userList.data)) {
            return (
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mail</TableCell>
                            <TableCell>isAdmin</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            userList.data.map(r => (
                                <TableRow key={r._id}>
                                    <TableCell component="th" scope="r">
                                        {r.userMail}
                                    </TableCell>
                                    <TableCell component="th" scope="r">
                                        <FormControlLabel
                                            control={<Checkbox value={r.isAdmin} checked={r.isAdmin} name="isCurrent" />}
                                            label="Admin ?"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" color="secondary" onClick={() => removeUser(r._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            )
        }
        if(userList.loading) {
            return <Loading color={'lightblue'} type={'bubbles'} />;
        }
        if(userList.errorMsg !== "") {
            return <p>{userList.errorMsg}</p>;
        }

        return <p>Impossible d'obtenir des données</p>;
    };

    return(
        <div>
            <h1>Liste des Utilisateurs</h1>
            <IconButton aria-label="add" color="primary" onClick={() => changeValueOpen(true)}>
                <AddIcon />
            </IconButton>
            {showData()}
            <AddUser open={open} handleClose={() => changeValueOpen(false)}/>
        </div>
    )
}

export default UserList;