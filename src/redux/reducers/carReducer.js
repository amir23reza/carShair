import types from '../actions/types'

const initialState = {
    cars : [],
    carMakes : [],
    searchedCars: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    
        default:
            return state;
    }
}

export default reducer