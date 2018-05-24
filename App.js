import ScreenManager from './src/ScreenManager';
import * as firebase from 'firebase';

import { YellowBox, AppRegistry } from 'react-native';
import _ from 'lodash';

  const config = {
      apiKey: 'AIzaSyArt6f03vm_o0aWr8bXum0EcZG1E1P7jcc',
      authDomain: 'uas-project-90970.firebaseapp.com',
      databaseURL: 'https://uas-project-90970.firebaseio.com',
      projectId: 'uas-project-90970',
      storageBucket: 'uas-project-90970.appspot.com',
      messagingSenderId: '29285657528'
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



export default ScreenManager;
AppRegistry.registerComponent('AppForm2', () => config);
