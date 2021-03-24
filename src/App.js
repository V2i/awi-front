import './App.css';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import FestivalList from "./containers/FestivalList";
import Festival from "./containers/Festival";
import GameList from "./containers/GameList";
import Game from "./containers/Game";

function App() {
  return (
    <div className="App">
        <nav>
            <NavLink to={"/festival/list"}>
                Festival
            </NavLink>
            <br />
            <NavLink to={"/game/list"}>
                Jeux
            </NavLink>
        </nav>
      <Switch>
        <Route path={"/festival/list"} exact component={FestivalList}/>
          {/* eslint-disable-next-line no-undef */}
        <Route path={"/festival/:id"} exact component={Festival}/>

        <Route path={"/game/list"} exact component={GameList}/>
        <Route path={"/game/:id"} exact component={Game}/>

        <Redirect to={"/"}/>
      </Switch>
    </div>
  );
}

export default App;
