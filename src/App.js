import React, { useState } from 'react';
import { Grommet } from 'grommet';
import { myTheme } from './myTheme';
import Login from './pages/Login';
import Line from './pages/Line';
import LineDetails from './pages/LineDetails';
import PositionDetails from './pages/PositionDetails';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  const [user, setUser] = useState();

  return (
    <Grommet theme={myTheme}>
      <Router>
        <Switch>
          <Route path='/lines/:id/:id' component={PositionDetails} />
          <Route path='/lines/:id' component={LineDetails} />
          <Route
            path='/lines'
            exact
            render={(props) => <Line {...props} user={user} />}
          />
          <Route
            path='/login'
            exact
            render={(props) => (
              <Login {...props} setUser={setUser} user={user} />
            )}
          />
          {user ? (
            <Redirect from='/' to='/lines' />
          ) : (
            <Redirect from='/' to='/login' />
          )}
          <Route path='/*' component={() => '404'} />
        </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
