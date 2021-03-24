import './App.css';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import FestivalList from "./containers/FestivalList";
import Festival from "./containers/Festival";
import EditorList from "./containers/EditorList";
import Editor from "./containers/Editor";
import ExhibitorList from "./containers/ExhibitorList";
import Exhibitor from "./containers/Exhibitor";

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
        <Route path={"/exhibitor/list"} exact component={ExhibitorList}/>
        <Route path={"/exhibitor/:id"} exact component={Exhibitor}/>
        <Redirect to={"/"}/>
      </Switch>
    </div>
  );
}

export default App;
