import { createDrawerNavigator } from '@react-navigation/drawer'
import FilterForm from '../components/filterForm';
import MainScreen from '../screens/mainScreen';
import colors from '../styles/colors';

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
    return (
        <DrawerNavigator.Navigator
            drawerContent={(props) => <FilterForm {...props} />}
            screenOptions={{ 
                headerShown: false, 
                drawerPosition: "right",
                drawerStyle : {
                    backgroundColor : colors.logoBlack,
                    width: "85%"
                },
            }}>
            <DrawerNavigator.Screen name="main" component={MainScreen} />
        </DrawerNavigator.Navigator>
    )
}

export default Drawer