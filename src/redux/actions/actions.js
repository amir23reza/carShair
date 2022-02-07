import types from "./types"

export const SearchCars_ = (searchValue) => {
    return {
        type: types.SearchCars,
        searchValue
    }
}

export const FetchCars_ = (data) => {
    return {
        type: types.FetchCars,
        data
    }
}

export const FetchMakes_ = (data) => {
    return {
        type: types.FetchCarMakes,
        data
    }
}