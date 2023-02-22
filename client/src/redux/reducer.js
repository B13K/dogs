
import { GET_DOGS,  } from "./types";

const initialState = {
    dogs: [],
    sortDogs: [],
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            return { ...state, dogs: action.payload, sortDogs: action.payload };
        default:
            return {...initialState};
    }
}


export default rootReducer;