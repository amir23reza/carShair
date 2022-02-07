import {
    Dimensions
} from 'react-native'

export const calculateLogoWidth = () => {
    let width = Dimensions.get("screen").width
    console.log(width)
    if (width > 500) {
        return 320
    } else {
        return parseInt(width * 0.75)
    }
}

export const baseURL = "https://vpic.nhtsa.dot.gov/api"