import {
    View, Image, TouchableOpacity, StyleSheet
} from 'react-native'
import { Header, Icon } from 'react-native-elements';
import colors from '../styles/colors'

const CustomHeader = ({color, rightComponent}) => {
    return (
        <Header 
                elevated={true}
                barStyle={"dark-content"}
                backgroundColor={color}
                leftComponent={
                    <View style={styles.headerLogoContainer}>
                        <Image resizeMode="contain" source={require('../images/logo.png')} style={styles.headerLogo} />
                    </View>
                }
                rightComponent={rightComponent}
            />
    )
}

const styles = StyleSheet.create({
    headerLogoContainer: {
        height: 40,
        display: "flex",
        flexDirection : "row"
    }, 
    headerLogo : {
        width: "100%",
        height: "100%"
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    }
})

export default CustomHeader