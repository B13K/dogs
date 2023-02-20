const axios = require("axios");
const { Op } = require("sequelize")
const { Dog, Temperament } = require("../db")
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds`;
const URL_SEARCH = `https://api.thedogapi.com/v1/breeds/search?q?api_key=${API_KEY}`


const getApi = async (nameRaza) => {   
    let response;
    nameRaza ? response = await axios.get(`${URL}/search?q=${nameRaza}&api_key=${API_KEY}`) //Trae los datos de la base  externa
             : response = await axios.get(`${URL}?api_key=${API_KEY}`) //Trae los datos de la base  externa
    return response.data
}
/*
const mapDogs = (id, name, weight, temperament, image) => {
    return {id, name, weight, temperament, image}
}
*/

const mapDogs = (dataApi) => {
    let data = dataApi.map( d => ({
                                    id: d.id,     
                                    name: d.name,
                                    height: d.height.metric,
                                    weight: d.weight.metric,
                                    temperament: d.temperament?.
                                                            split(",")
                                                            .map(e => e.trim()),
                                    image: d.image?.url
                                }))
    return data;
}

const mapDogsDb = (dataDB) => {
    let data = dataDB.map( d => ({
        id: d.id,     
        name: d.name,
        height: d.height,
        weight: d.weight,
        temperament: d.Temperaments.map(e => e.name),
        image: d.image
    }))
    return data;
}

const dogsControllers = {

    getDogByName: async (name) => {
        const dataApi = await getApi(name);
        const dataDb = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike] :`%${name}%`
                }
            },
            include: {
                model: Temperament,
                attributes: ["name"]
            }
            
    
        })
        return mapDogsDb(dataDb).concat(mapDogs(dataApi))
    },

    getDogsAll: async () => {

        let dataApi = await getApi();
        let dataMap =  mapDogs(dataApi)
        let dataDb = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        if(dataMap.lenght <= 0 && dataDb.lenght <= 0){
            throw new Error("No found dog")
        }
        return mapDogsDb(dataDb).concat(dataMap);

    },

    getDogByIdApi: async (id) => {
        const data = await getApi()
        const dogSearch = data.find(d => d.id === Number(id))
        const dogMap = {
            "id": dogSearch.id,
            "name": dogSearch.name,
            "weight": dogSearch.weight.metric,
            "temperament": dogSearch.temperament.split(",").map(e => e.trim()),
            "image": dogSearch.image.url,
            "height": dogSearch.height.metric,
            "life_span": dogSearch.life_span
        }
        return dogMap;
    },

    getDogByIdDb: async (id) => {
        let findDog = await Dog.findOne({
            where: {
                id: id
            },        
            include: {
                model: Temperament,
                atrributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        const dogMap = {
            "id": findDog.id,
            "name": findDog.name,
            "weight": findDog.weight,
            "temperament": findDog.Temperaments.map(e => e.name),
            "image": findDog.image,
            "height": findDog.height,
            "life_span": findDog.life_span
        }
        return dogMap;        
    },

    addDog: async (name, height, weight, life_span, temperament) => {
    
        const newDog = await Dog.create({name, height, weight, life_span})
        await newDog.addTemperaments(temperament)    
        return newDog
    }
}



module.exports = dogsControllers