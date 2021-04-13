import React /* , { useContext } */ from 'react';
import { Grommet } from 'grommet';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Lines from './pages/Lines';
import LineDetails from './pages/LineDetails';
import StationDetails from './pages/StationDetails';
import { lightTheme } from './myTheme';

import LineContextProvider from './contexts/lineContext';
// import { ThemeContext } from 'styled-components';

function App() {
  // const { myTheme } = useContext(ThemeContext);
  return (
    <Grommet theme={lightTheme}>
      <LineContextProvider>
        <Router>
          <Switch>
            <Route
              path='/lines/:lineId/:positionId'
              component={StationDetails}
            />
            <Route path='/lines/:lineId' component={LineDetails} />
            <Route
              path='/lines'
              exact
              render={(props) => <Lines {...props} />}
            />
            <Route path='/' exact render={(props) => <Login {...props} />} />

            {/* user ? (
              <Redirect from='/' to='/lines' />
            ) : (
              <Redirect from='/' to='/login' />
            ) */}
            <Route path='/*' component={() => '404'} />
          </Switch>
        </Router>
      </LineContextProvider>
    </Grommet>
  );
}

export default App;
