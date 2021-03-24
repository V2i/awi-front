import './App.css';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import FestivalList from "./containers/FestivalList";
import Festival from "./containers/Festival";

import GameList from "./containers/GameList";
import Game from "./containers/Game";

import EditorList from "./containers/EditorList";
import Editor from "./containers/Editor";

import ExhibitorList from "./containers/ExhibitorList";
import Exhibitor from "./containers/Exhibitor";

import ReservationList from "./containers/ReservationList";
import Reservation from "./containers/Reservation";

function App() {
  return (
    <div className="App">
        <nav>
            <NavLink to={"/festival/list"}>Festivals</NavLink>
            <NavLink to={"/game/list"}>Jeux</NavLink>
            <NavLink to={"/editor/list"}>Editeurs</NavLink>
            <NavLink to={"/exhibitor/list"}>Exposants</NavLink>
            <NavLink to={"/reservation/list"}>Reservations</NavLink>
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
        <Redirect to={"/"}/>
      </Switch>
    </div>
  );
}

export default App;
