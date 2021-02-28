import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Charecter } from './Components/Character/Character';
import { Home } from './Components/Home/Home';
import { Locations } from './Components/Locations/Locations';
import { Episodes } from './Components/Episodes/Episodes';

function App() {
  return (
    <div className="app">
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
