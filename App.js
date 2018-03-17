import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import ScarletScreen from './Scene/ScarletScr';
import GrayScreen from './Scene/GrayScr';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="scarlet"
          component={ScarletScreen}
          title="Scarlet"
          hideNavBar={true}
          initial
        />
        <Scene
          key="gray"
          component={GrayScreen}
          title="Welcome"
        />
      </Scene>
    </Router>
  );
}

export default App;