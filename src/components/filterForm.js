import axios from 'axios'
import { useEffect, useState } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { Button, Slider } from 'react-native-elements'
import { baseURL } from '../helper/helper'
import colors from '../styles/colors'
import { useDispatch, useSelector } from 'react-redux'
import { FetchMakes_, FetchCars_ } from '../redux/actions/actions'

const FilterForm = ({navigation}) => {

    const dispatch = useDispatch()

    const [type, setType] = useState('car')
    const [make, setMake] = useState('')
    const [year, setYear] = useState(2015)
    const [loading, toggleLoading] = useState(true)

    const { carMakes } = useSelector(state => ({
        carMakes: state.carReducer.carMakes
    }))

    const fetchMakes = () => {
        toggleLoading(true)
        axios.get(baseURL + "/vehicles/GetMakesForVehicleType/" + type + "?format=json")
            .then(data => {
                console.log(data.data.Results)
                dispatch(FetchMakes_(data.data.Results))
                setMake(data.data.Results[0].MakeId)
                toggleLoading(false)
            })
            .catch(error => {
                console.log(error)
                alert("failed to load data ...! please try again later")
            })
    }

    const filterVehicles = () => {
        toggleLoading(true)
        axios.get(baseURL+"/vehicles/GetModelsForMakeIdYear/makeId/"+make+"/modelyear/"+year+"/vehicleType/"+type+"?format=json")
            .then(data => {
                dispatch(FetchCars_(data.data.Results))
                toggleLoading(false)
                navigation.closeDrawer()
            })
            .catch(error => {
                console.log(error)
                alert("failed to load data ...! please try again later")
            })
    }

    useEffect(() => {
        fetchMakes()
    }, [type])


    return (
        <ScrollView style={styles.formContainer}>
            {
                loading ? (
                    <View>
                        <ActivityIndicator size="large" color={colors.logoGreen} style={{ marginTop: "40%" }} />
                        <Text style={{ color: colors.logoGreen, textAlign: "center" }}>Loading Data... Please Wait!</Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.formTitle}>Filter Vehicles</Text>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>Vehicle Type</Text>
                            <Picker
                                selectedValue={type}
                                style={{ color: colors.logoGreen }}
                                onValueChange={(itemValue, itemIndex) => { setType(itemValue); }}
                            >
                                <Picker.Item label="Car" value="car" />
                                <Picker.Item label="Bus" value="bus" />
                                <Picker.Item label="Truck" value="truck" />
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>Vehicle Make</Text>
                            <Picker
                                style={{ color: colors.logoGreen }}
                                selectedValue={make}
                                onValueChange={(itemValue, itemIndex) => {setMake(itemValue); }}
                            >
                                {
                                    carMakes && carMakes.map((make, index) => (
                                        <Picker.Item key={index} label={make.MakeName} value={make.MakeId} />
                                    ))
                                }
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>Vehicle Year</Text>
                            <View style={styles.SliderContainer}>
                                <View style={{ flex: 1, padding: '1%', justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: colors.logoGreen, fontWeight: "700" }}>{year}</Text>
                                </View>
                                <View style={{ flex: 5, padding: '1%' }}>
                                    <Slider
                                        value={year}
                                        onValueChange={setYear}
                                        maximumValue={2020}
                                        minimumValue={2015}
                                        step={1}
                                        allowTouchTrack
                                        trackStyle={{ height: 5, backgroundColor: colors.logoGreen }}
                                        thumbStyle={{ height: 20, width: 20, backgroundColor: colors.logoGreen }}
                                    />
                                </View>
                            </View>
                        </View>
                        <Button
                            title={'Apply Filters'}
                            containerStyle={{
                                width: "100%",
                                marginVertical: "10%",
                            }}
                            buttonStyle={{
                                backgroundColor: colors.logoGreen,
                            }}
                            titleStyle={{
                                color: colors.logoBlack
                            }}
                            onPress={filterVehicles}
                        />
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: colors.logoBlack,
        paddingTop: 100,
        paddingHorizontal: '6%'
    },
    formTitle: {
        color: colors.logoGreen,
        width: "100%",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: '10%'
    },
    pickerContainer: {
        width: '100%',
        marginTop: '5%'
    },
    pickerLabel: {
        fontSize: 12,
        color: colors.logoGreen
    },
    SliderContainer: {
        display: "flex",
        flexDirection: "row",
        marginVertical: "5%"
    }
})

export default FilterForm