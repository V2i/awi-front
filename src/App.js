import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Redirect} from 'react-router-dom';

import FestivalList from "./containers/Festivals/FestivalList";
import Festival from "./containers/Festivals/Festival";

import GameList from "./containers/Games/GameList";
import Game from "./containers/Games/Game";

import EditorList from "./containers/Editors/EditorList";
import Editor from "./containers/Editors/Editor";

import ExhibitorList from "./containers/Exhibitors/ExhibitorList";
import Exhibitor from "./containers/Exhibitors/Exhibitor";

import ReservationList from "./containers/Reservations/ReservationList";
import Reservation from "./containers/Reservations/Reservation";

import UserList from "./containers/Users/UserList";

import NavBar from "./containers/Navbar";

function App() {
    return (
        <div className="App">
            <nav>
                <NavBar/>
            </nav>
            <Switch>
                <Route path={"/festival/list"} exact component={FestivalList}/>
                <Route path={"/festival/:id"} exact component={Festival}/>

                <Route path={"/game/list"} exact component={GameList}/>
                <Route path={"/game/:id"} exact component={Game}/>

                <Route path={"/editor/list"} exact component={EditorList}/>
                <Route path={"/editor/:id"} exact component={Editor}/>

                <Route path={"/exhibitor/list"} exact component={ExhibitorList}/>
                <Route path={"/exhibitor/:id"} exact component={Exhibitor}/>

                <Route path={"/reservation/list"} exact component={ReservationList}/>
                <Route path={"/reservation/:id"} exact component={Reservation}/>

                <Route path={"/user/list"} exact component={UserList}/>

                <Redirect to={"/"}/>
            </Switch>
        </div>
    );
}

export default App;
