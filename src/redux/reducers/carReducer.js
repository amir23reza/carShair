import types from '../actions/types'

const initialState = {
    cars : [],
    carMakes : [],
    searchedCars: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SearchCars:
            let tmpCars = state.cars;
            let searchValue = action.searchValue.toLowerCase()
            let filteredCars = tmpCars.filter(car => {
                return car.Make_Name.toLowerCase().indexOf(searchValue) > -1 || car.Model_Name.toLowerCase().indexOf(searchValue) > -1 
            })
            return {...state, searchedCars: filteredCars}

        case types.FetchCars:
            return {...state, cars: action.data, searchedCars: action.data}

        case types.FetchCarMakes:
            return {...state, carMakes: action.data}
    
        default:
            return state;
    }
}

export default reducer