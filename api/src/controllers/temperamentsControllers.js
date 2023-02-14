const axios = require("axios");

const { Temperament } = require("../db")

const API_KEY = process.env.API_KEY
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;


const addTemperament = async () => {
    const response = await axios.get(URL);
    let arrTemperaments = [];
    
    response.data.forEach(t => {
        if(t.temperament){
            const newArr = t.temperament.split(",")
            newArr.forEach(e => {
                arrTemperaments.push(e.trim())
            })
        }
    });
    
    const temperamentAll = new Set(arrTemperaments);

    temperamentAll.forEach(async (e) => {
        await Temperament.create({name: e})
    });

    const temperamentsAll = await Temperament.findAll()
    return temperamentsAll;
}


const getTemperamentAll = async () => {
    const temperamentsAll = Temperament.findAll();
    return temperamentsAll;
}



module.exports = {
    getTemperamentAll,
    addTemperament
}