import React, { useState } from 'react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import Login from './pages/Login';
import Line from './pages/Line';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const theme = deepMerge(grommet, {
  list: {
    item: {
      pad: { horizontal: 'large', vertical: 'xsmall' },
      background: ['white', 'light-2'],
      border: true,
    },
  },
});

function App() {
  const [isAuth, setAuth] = useState(false);

  if (isAuth === false) {
    return (
      <Grommet theme={theme}>
        <Login isAuth={isAuth} setAuth={setAuth} />;
      </Grommet>
    );
  }

  return (
    <Grommet theme={theme}>
      <Router>
        <Switch>
          {isAuth && <Redirect from='/' to='/line' exact />}
          <Route
            path='/login'
            exact
            render={(props) => (
              <Login {...props} setAuth={setAuth} isAuth={isAuth} />
            )}
          />
          {isAuth === false && <Redirect from='/*' to='/login' exact />}
          <Route path='/line' exact component={Line} />
          <Route path='/*' component={() => '404'} />
        </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
