
import { GET_FILTER_DOGS, GET_DOGS } from "./types";

const initialState = {
    dogs: [],
    filterDogs: [],
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            return { ...state, dogs: action.payload };
        case GET_FILTER_DOGS:
            return {...state, dogs: action.payload} //los dogs filtrados actualizan dogs
        default:
            return {...initialState};
    }
}

export default rootReducer;