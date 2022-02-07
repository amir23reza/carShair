import { useState } from 'react';
import {
    View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Text, ActivityIndicator
} from 'react-native'
import { Header, HeaderProps, Icon, Input } from 'react-native-elements';
import colors from '../styles/colors'
import CustomHeader from '../components/customHeader';
import CarCard from '../components/carCard';

const MainScreen = ({ navigation }) => {

    

    const [isSearching, toggleSearching] = useState()
    const [searchValue_, setSearchValue] = useState("")


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
                            onChangeText={setSearchValue}
                        />
                        <Text style={styles.searchResultNumber}>100 results</Text>
                    </View>
                ) : null
            }
            <ScrollView>
                <View style={styles.cardsContainer}>
                    <CarCard />
                    <CarCard />
                    <CarCard />
                    <CarCard />
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