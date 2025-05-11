// Import all polyfills first
import './src/polyfills';

// Initialize react-native-screens
import { enableScreens } from 'react-native-screens';
enableScreens();

// Initialize react-native-gesture-handler
import 'react-native-gesture-handler';

import {registerRootComponent} from 'expo';
import App from './App';

registerRootComponent(App);
