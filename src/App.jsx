import './App.scss';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Charecter } from './Components/Character/Character';
import { Home } from './Components/Home/Home';
import { Locations } from './Components/Locations/Locations';
import { Episodes } from './Components/Episodes/Episodes';

function App() {

  return (
    <div className="app">

      {/* <div>
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
      </div> */}

    <Switch>
      <Route path="/character">
        <Charecter />
      </Route>
      <Route path="/locations">
        <Locations />
      </Route>
      <Route path="/episodes">
        <Episodes />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
    </div>
  );
}

export default App;
