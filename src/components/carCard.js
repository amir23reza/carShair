import {
    View, StyleSheet, TouchableOpacity, Text, Image
} from 'react-native'
import { Icon } from 'react-native-elements'
import colors from '../styles/colors'
import {LinearGradient} from 'expo-linear-gradient'

const images = [
    require("../images/dummyImages/1.jpg"),
    require("../images/dummyImages/2.jpg"),
    require("../images/dummyImages/3.jpg"),
    require("../images/dummyImages/4.jpg"),
    require("../images/dummyImages/5.jpg"),
    require("../images/dummyImages/6.jpg"),
    require("../images/dummyImages/7.jpg"),
    require("../images/dummyImages/8.jpg"),
    require("../images/dummyImages/9.jpg"),
    require("../images/dummyImages/10.jpg")
]

const CarCard = ({car_}) => {
    const source = () => {
        let index_ = car_.Model_ID % 10
        return images[index_]
    }
    return (
        <TouchableOpacity>
            <View style={styles.carContainer}>
                <View style={styles.cardImageContainer}>
                    <Image source={images[0]} style={styles.cardImage} resizeMode="cover" />
                </View>
                <LinearGradient colors={[colors.logoBlack, colors.logoWhite]} style={{borderBottomLeftRadius: 10}} start={{x:0, y:0}} end={{x:1,y:1}}>
                    <View style={styles.cardDetailsContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.carMake}>Honda</Text>
                            <Text style={styles.carModel}>Civic</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                            <Icon type="font-awesome-5" name="chevron-right" style={{ color: colors.logoGreen }} />
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    carContainer: {
        width: "98%",
        display: "flex",
        flexDirection: "column",
        borderBottomLeftRadius: 10,
        backgroundColor: colors.logoWhite,
        elevation: 5,
        marginVertical: "3%",
        borderWidth: 1,
        borderColor: colors.logoBlack,
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    cardImageContainer: {
        width: "100%",
        aspectRatio: 2 / 1
    },
    cardImage: {
        width: "100%",
        height: "100%"
    },
    cardDetailsContainer: {
        padding: "2%",
        display: "flex",
        flexDirection: "row"
    },
    carMake: {
        fontSize : 18,
        fontWeight: "400",
        color: colors.logoWhite
    }, 
    carModel: {
        fontSize: 12,
        color: colors.logoWhite,
    }
})

export default CarCard