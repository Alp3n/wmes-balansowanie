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

// const theme = deepMerge(grommet, {
//   list: {
//     item: {
//       pad: { horizontal: 'large', vertical: 'xsmall' },
//       background: ['white', 'light-2'],
//       border: true,
//     },
//   },
// });

function App() {
  const [isAuth, setAuth] = useState(true);

  return (
    <Grommet theme={myTheme}>
      <Router>
        <Switch>
          <Route path='/lines/:id/:id' component={PositionDetails} />
          <Route path='/lines/:id' component={LineDetails} />
          <Route path='/lines' exact component={Line} />
          <Route
            path='/login'
            exact
            render={(props) => (
              <Login {...props} setAuth={setAuth} isAuth={isAuth} />
            )}
          />
          {isAuth ? (
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
