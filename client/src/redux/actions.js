
import axios from "axios"

import { GET_DOG, GET_DOGS, ADD_DOG,  } from "./types";

const url = "http://localhost:3001/dogs"

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
    console.log("GetDogByID")
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

/*
export const orderBy = (sort) => {
    console.log("orderBy")
    return {type: SORT_DOGS, payload: sort}
}
*/