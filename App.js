import 'react-native-gesture-handler';
import { useEffect, useState } from "react"
import SplashScreen from "./src/screens/splash"
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './src/navigators/drawerNavigator'

import { Provider } from 'react-redux'
import store from './src/redux/store'


const App = () => {

  const [splash, toggleSplash] = useState(true)


  useEffect(() => {
    setTimeout(() => {
      toggleSplash(false)
    }, 1000)
  }, [])
  return (
    <Provider store={store}>
      {
        splash ? (<SplashScreen />) : (
          <NavigationContainer>
            <Drawer />
          </NavigationContainer>
        )
      }
    </Provider>
  )
}

export default App