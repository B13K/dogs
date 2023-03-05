
import axios from "axios"

import {  GET_DOGS, GET_DOG, GET_TEMPERAMENTS, SORT_DOGS, FILTER_DOGS, RESET_FILTER, RESET_DOG, RESET_DOGS } from "./types";

const url = "http://localhost:3001/dogs"
const urlTemp = "http://localhost:3001/temperaments"

export const getDogs = () => {
    return async function(dispatch) {
        const apiData = await axios.get(url)
        const dogs = apiData.data
        dispatch({type: GET_DOGS, payload: dogs})
    }
}

export const getSearchDogs = (name) => {
    return async function(dispatch) {
        const apiData = await axios.get(`${url}?name=${name}`);
        const dogs = apiData.data;
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

// export const addDog = (newDog) => {
//     return async function(dispatch) {
//         //const apiData = await axios(`${url}`, newDog)
//         //const msg = apiData.data;
//         dispatch({type: ADD_DOG})
//     }
// }

export const getTemperaments = () => {
    return async function(dispatch) {
        const apiData = await axios.get(`${urlTemp}`)
        // const temperaments = apiData.data.map( t => {
        //     return t.name
        // })
        const temperaments = apiData.data
        dispatch({type: GET_TEMPERAMENTS, payload: temperaments})
    }
}


export const sortDogs = (sort) => {
    return {type: SORT_DOGS, payload: sort};
}

export const filterDogs = (filter) => {
    return { type: FILTER_DOGS, payload: filter };
}

export const resetDogsFilter = () => {
    return {type: RESET_FILTER}
}

export const resetDogById = () => {
    return { type: RESET_DOG }
}

export const resetDogs = () => {
    return {type: RESET_DOGS}
}
