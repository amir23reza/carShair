import {
    StyleSheet, 
    View,
    Image,
    StatusBar
} from 'react-native'
import colors from '../styles/colors'
import {calculateLogoWidth} from '../helper/helper'

const SplashScreen = () => {
    return (
        <View style={styles.splashView}>
            <StatusBar backgroundColor={colors.logoWhite} animated={true} barStyle="dark-content" />
            <View style={{width: calculateLogoWidth()}}>
                <Image source={require("../images/logo.png")} style={styles.splashLogo} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    splashView : {
        flex: 1,
        backgroundColor: colors.logoWhite,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    logoContainer: {
        width: 320
    },
    splashLogo: {
        width : '100%',
        resizeMode: "contain"
    }
})

export default SplashScreen