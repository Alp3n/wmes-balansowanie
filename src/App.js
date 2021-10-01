import React from 'react';
import { Grommet } from 'grommet';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Lines from './pages/Lines';
import LineDetails from './pages/LineDetails';
import StationDetails from './pages/StationDetails';
import { lightTheme } from './myTheme';

import LineContextProvider from './contexts/lineContext';
import ModalContextProvider from './contexts/modalContext';
import CameraContextProvider from './contexts/cameraContext';
import Camera from './pages/Camera';

function App() {
  return (
    <Grommet theme={lightTheme}>
      <ModalContextProvider>
        <LineContextProvider>
          <CameraContextProvider>
            <Router basename='/ct-balancing'>
              <Switch>
                <Route
                  path='/lines/:lineId/:positionId/camera'
                  component={Camera}
                  exact
                />
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
                <Route
                  path='/'
                  exact
                  render={(props) => <Login {...props} />}
                />

                <Route path='/*' component={() => '404'} />
              </Switch>
            </Router>
          </CameraContextProvider>
        </LineContextProvider>
      </ModalContextProvider>
    </Grommet>
  );
}

export default App;
