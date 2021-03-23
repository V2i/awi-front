import './App.css';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import FestivalList from "./containers/FestivalList";
import Festival from "./containers/Festival";

function App() {
  return (
    <div className="App">
        <nav>
            <NavLink to={"/festival/list"}>
                Search
            </NavLink>
        </nav>
      <Switch>
        <Route path={"/festival/list"} exact component={FestivalList}/>
          {/* eslint-disable-next-line no-undef */}
        <Route path={"/festival/:id"} exact component={Festival}/>
        <Redirect to={"/"}/>
      </Switch>
    </div>
  );
}

export default App;
