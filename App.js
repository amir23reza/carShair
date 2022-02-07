import 'react-native-gesture-handler';
import SplashScreen from "./src/screens/splash";
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './src/navigators/drawerNavigator'

import { Provider } from 'react-redux'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </Provider>
  )
}

export default App