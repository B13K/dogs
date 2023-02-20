
import axios from "axios"

import { GET_DOG, GET_DOGS, ADD_DOG, GET_FILTER_DOGS } from "./types";

const url = "http://localhost:3001/dogs"

export const getDogs = () => {
    return async function(dispatch) {
        const apiData = await axios.get(url)
        const dogs = apiData.data
        dispatch({type: GET_DOGS, payload: dogs})
    }
}

export const getDogById = (id) => {
    return async function(dispatch) {
        const apiData = await axios.get(`${url}/${id}`)
        const dog = apiData.data;
        dispatch({type: GET_DOG, payload: dog})
    }
}

export const addDog = (newDog) => {
    return async function(dispatch) {
        //const apiData = await axios(`${url}`, newDog)
        //const msg = apiData.data;
        dispatch({type: ADD_DOG})
    }
}

export const getFilterDogs = (name) => {
    return async function(dispatch) {
        const apiData = await axios.get(`${url}?name=${name}`);
        const dogs = apiData.data;
        dispatch({type: GET_FILTER_DOGS, payload: dogs})

    }
}
