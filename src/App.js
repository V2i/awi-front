import './App.css';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import FestivalList from "./containers/FestivalList";
import Festival from "./containers/Festival";
import EditorList from "./containers/EditorList";
import Editor from "./containers/Editor";

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
        <Route path={"/festival/:id"} exact component={Festival}/>
        <Route path={"/editor/list"} exact component={EditorList}/>
        <Route path={"/editor/:id"} exact component={Editor}/>
        <Redirect to={"/"}/>
      </Switch>
    </div>
  );
}

export default App;
