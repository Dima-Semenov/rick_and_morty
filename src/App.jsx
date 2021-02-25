import './App.scss';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Charecter } from './Components/Character/Character';


function App() {

  return (
    <div className="app">

      <div>
        <Link to="/">
          Home
        </Link>
        <Link to="/character">
          Character
        </Link>
        <Link to="/locations">
          Locations
        </Link>
        <Link to="/episodes">
          Episodes
        </Link>
      </div>

    <Switch>
      <Route path="/character">
        <Charecter />
      </Route>
      <Route path="/locations">
        <p>Locations</p>
      </Route>
      <Route path="/episodes">
        <p>Episodes</p>
      </Route>
      <Route path="/" exact>
        <p>Hello, world!</p>
      </Route>
      <Redirect to="/" />
    </Switch>
    </div>
  );
}

export default App;
