
import { DOGS_FILTER, FILTER_DOGS, GET_DOG, GET_DOGS, GET_TEMPERAMENTS, SORT_DOGS,  } from "./types";


const initialState = {
    dogs: [],
    dog: {},
    DogsFilter: [],
    temperaments: [],
    sortDogs: { sort: "default", type: "name" },
    filterDogs:{ db: "all", temperament: "all" }
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOG:
            return {...state, dog: action.payload}
        case GET_DOGS:
            return { ...state, dogs: action.payload};
        case DOGS_FILTER:
            return { ...state, dogsFilter: action.payload };
        case SORT_DOGS:
            return { ...state, sortDogs: action.payload };
        case FILTER_DOGS:
            return { ...state, filterDogs: action.payload };
        case GET_TEMPERAMENTS:
            return {...state, temperaments: action.payload};
        default:
            return {...initialState};
    }
}


export default rootReducer;