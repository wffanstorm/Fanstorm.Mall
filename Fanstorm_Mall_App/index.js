/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import storage from './src/utils/storage'

global.version = '1.0.0'
global.isDebug = true
global.host = "http://192.168.0.104:5000"

global.currentUser = null
global.nav = null
global.func = {
  checkLogin: () => { }
}

global.storage = storage

global.storage.load('currentUser', (u) => {
  global.currentUser = u
})

AppRegistry.registerComponent(appName, () => App);
