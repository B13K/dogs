const axios = require("axios");

const { Temperament } = require("../db")

const API_KEY = process.env.API_KEY
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;



const getApiTemperaments = async () => {
    const response = await axios.get(URL);
    return response.data
}

const temperamentControllers = {

    

    getTemperamentAll: async () => {
        
                            const data = await Temperament.findAll();
                            return data
                        },

    addtemperament: async (name) => {
                            await Temperament.create(name)
                            return;
    },

    addTemperamentAll: async () => {
                            const data = await getApiTemperaments()
                            const arrTemperaments = []
                            data.forEach(t => {
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
                            return;
                        },

    
}


module.exports = {
    ...temperamentControllers
}