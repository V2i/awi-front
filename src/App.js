import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Redirect} from 'react-router-dom';

import FestivalList from "./containers/Festivals/FestivalList";
import Festival from "./containers/Festivals/Festival";

import GameList from "./containers/Games/GameList";
import Game from "./containers/Games/Game";

import ZoneList from "./containers/Zones/ZoneList"
import Zone from "./containers/Zones/Zone"

import EditorList from "./containers/Editors/EditorList";
import Editor from "./containers/Editors/Editor";

import ExhibitorList from "./containers/Exhibitors/ExhibitorList";
import Exhibitor from "./containers/Exhibitors/Exhibitor";

import ReservationList from "./containers/Reservations/ReservationList";
import Reservation from "./containers/Reservations/Reservation";

import UserList from "./containers/Users/UserList";
import Login from "./containers/Users/Login";
import User from "./containers/Users/User";

import ContactList from "./containers/Contacts/ContactList";

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

                <Route path={"/festival/:festivalId/zone/:id"} exact component={Zone}/>

                <Route path={"/editor/list"} exact component={EditorList}/>
                <Route path={"/editor/:id"} exact component={Editor}/>

                <Route path={"/exhibitor/list"} exact component={ExhibitorList}/>
                <Route path={"/exhibitor/:id"} exact component={Exhibitor}/>

                <Route path={"/reservation/list"} exact component={ReservationList}/>
                <Route path={"/reservation/:id"} exact component={Reservation}/>

                <Route path={"/user/list"} exact component={UserList}/>
                <Route path={"/login"} exact component={Login}/>
                <Route path={"/profile"} exact component={User}/>

                <Route path={"/contact/list"} exact component={ContactList}/>

                <Redirect to={"/"}/>
            </Switch>
        </div>
    );
}

export default App;