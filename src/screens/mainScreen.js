import { useEffect, useState } from 'react';
import {
    View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Text, ActivityIndicator
} from 'react-native'
import { baseURL, hexToRgbA } from '../helper/helper'
import { Header, HeaderProps, Icon, Input } from 'react-native-elements';
import colors from '../styles/colors'
import CustomHeader from '../components/customHeader';
import CarCard from '../components/carCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { FetchCars_, SearchCars_ } from '../redux/actions/actions'

const MainScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [isSearching, toggleSearching] = useState()
    const [loadingVehicles, toggleLoadingVehicles] = useState(true)
    const [searchValue_, setSearchValue] = useState("")

    const {searchedCars} = useSelector(state => ({
        searchedCars: state.carReducer.searchedCars,
    }))

    const fetchCars = () => {
        axios.get(baseURL + "/vehicles/getmodelsformake/merc?format=json")
            .then(data => {
                // console.log(data.data)
                if (data.data.Message == "Response returned successfully") {
                    dispatch(FetchCars_(data.data.Results))
                    toggleLoadingVehicles(false)
                } else {
                    alert("failed to load data ...! please try again later")
                }
            })
            .catch(err => {
                console.log(err)
                alert("failed to load data ...! please try again later")
            })
    }

    const searchCars = (searchValue) => {
        // console.log(searchValue)
        setSearchValue(searchValue)
        dispatch(SearchCars_(searchValue))
    }

    useEffect(() => {
        fetchCars()
    }, [])

    return (
        <SafeAreaView style={styles.mainView}>
            <CustomHeader
                color={colors.logoWhite}
                rightComponent={
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => { toggleSearching(!isSearching) }}>
                            <Icon type='font-awesome-5' name="search" color={isSearching ? colors.logoGreen : colors.logoBlack} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 15 }}
                            onPress={() => { navigation.openDrawer() }}
                        >
                            <Icon type='font-awesome-5' name="filter" color={colors.logoBlack} />
                        </TouchableOpacity>
                    </View>
                }
            />
            {
                isSearching ? (
                    <View style={styles.searchContainer}>
                        <Input
                            autoFocus={true}
                            placeholder="Search for cars ..."
                            value={searchValue_}
                            inputStyle={{ color: colors.logoGreen }}
                            placeholderTextColor={colors.logoGreen}
                            inputContainerStyle={{ borderColor: colors.logoGreen }}
                            onChangeText={searchCars}
                        />
                        <Text style={styles.searchResultNumber}>{searchedCars.length} results</Text>
                    </View>
                ) : null
            }
            <ScrollView>
                <View style={styles.cardsContainer}>
                    {
                        loadingVehicles ? (
                            <View>
                                <ActivityIndicator size="large" color={colors.logoGreen} style={{ marginTop: "40%" }} />
                                <Text style={{ color: colors.logoBlack }}>Loading Vehicles... Please Wait!</Text>
                            </View>
                        ) : searchedCars.length == 0 ? (
                            <Text style={{color: colors.logoBlack, textAlign: "center", marginVertical: "10%"}}>
                                No Vehicles Found ...
                            </Text>
                        ) : (
                            <View>
                                {
                                    searchedCars.map((car_, index) => (
                                        <CarCard key={index} car_={car_}  />
                                    ))
                                }
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.logoWhite
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    searchContainer: {
        backgroundColor: colors.logoBlack,
        padding: "1%",
        borderBottomLeftRadius: 10
    },
    searchInput: {
        color: colors.logoGreen,
    },
    searchResultNumber: {
        color: colors.logoGreen,
        textAlign: "right",
        marginHorizontal: 10
    },
    cardsContainer: {
        display: 'flex',
        alignItems: "center",
    }
})

export default MainScreen