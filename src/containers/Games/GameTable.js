import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import { getGameList, deleteGame, patchGame } from "../../actions/GameActions";

import IconButton from '@material-ui/core/IconButton';
import { TextField, FormControl, FormControlLabel, Checkbox, InputLabel, Select, MenuItem,
    Table, TableBody, TableCell, TableRow, TableHead, 
 } from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {Link} from 'react-router-dom';
import { Visibility, Create, Delete, Save } from '@material-ui/icons';

const GameTable = () => {

    return (
    <Table aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Age Min</TableCell>
                <TableCell>Durée (en min)</TableCell>
                <TableCell>Min Joueurs</TableCell>
                <TableCell>Max Joueurs</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Notice</TableCell>
                <TableCell>Prototype ?</TableCell>
                <TableCell> </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {gameList.data.map((row) => (
            <TableRow key={row._id}>
                <TableCell>
                    {selectedGame._id === row._id ? <TextField name="gameName" label="Nom" value={selectedGame.gameName} onChange={handleChange}/> : row.gameName }
                </TableCell>
                <TableCell>
                    {selectedGame._id === row._id ? <TextField name="gameMinimumAge" label="Age Min" value={selectedGame.gameMinimumAge} onChange={handleChange}/> : row.gameMinimumAge }
                </TableCell>
                <TableCell>
                    {selectedGame._id === row._id ? <TextField name="gameDuration" label="Durée" value={selectedGame.gameDuration} onChange={handleChange}/> : row.gameDuration }
                </TableCell>
                <TableCell>
                    {selectedGame._id === row._id ? <TextField name="gameMinimumPlayers" label="Nb Min Joueurs" value={selectedGame.gameMinimumPlayers} onChange={handleChange}/> : row.gameMinimumPlayers }
                </TableCell>
                <TableCell>
                    {selectedGame._id === row._id ? <TextField name="gameMaximumPlayers" label="Nb Max Joueurs" value={selectedGame.gameMaximumPlayers} onChange={handleChange}/> : row.gameMaximumPlayers }
                </TableCell>
                
                <TableCell>
                { selectedGame._id === row._id 
                ? gameTypeList.data && 
                    
                    <FormControl>
                        <InputLabel id="gameType">Catégorie</InputLabel>
                        <Select
                        labelId="gameType"
                        id="gameTypeSelect"
                        name="gameType"
                        value={gameTypeList.data.find(t => t._id === selectedGame.gameType._id)}
                        onChange={handleChange}
                        >
                        {gameTypeList.data.map(t => <MenuItem value={t._id} key={t._id}>{t.gameTypeName}</MenuItem>)}
                        </Select>
                    </FormControl>
                        
                : row.gameType.gameTypeName
                }
                </TableCell>
                <TableCell>
                    {selectedGame._id === row._id ? <TextField name="gameNotice" label="Notice" value={selectedGame.gameNotice} onChange={handleChange}/> : row.gameNotice }
                </TableCell>
                <TableCell>
                    {
                    selectedGame._id === row._id 
                    ? <FormControlLabel
                        control={
                        <Checkbox
                            checked={selectedGame.isPrototype}
                            onChange={handleChange}
                            name="isPrototype"
                            color="primary"
                        />
                        }
                    />
                    : <Checkbox
                            checked={row.isPrototype}
                            disabled
                            name="isPrototype"
                            color="primary"
                        />
                    }
                
                </TableCell>
                {user.isLoggedIn
                    ?
                        <TableCell>
                            { selectedGame._id === row._id
                                ? <IconButton variant="outlined" onClick={() => saveGame(selectedGame)}><Save /></IconButton>
                                : <IconButton variant="outlined" style={{ color: green[500] }} onClick={() => setGame(row)}><Create /></IconButton>
                            }
                            <IconButton variant="outlined" color="secondary" onClick={() => removeGame(row._id)}><Delete /></IconButton>
                        </TableCell>
                    :
                        <></>
                }
            </TableRow>
        ))}
        </TableBody>
    </Table>
)
}

export default GameTable;