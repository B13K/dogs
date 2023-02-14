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



const searchDogs = async (nameRaza) => {
    const dataApi = await getApi(nameRaza);
    const dataDb = await Dog.findAll({
        where: {
            name: {
                [Op.iLike] :`%${nameRaza}%`
            }
        },
        include: {
            model: Temperament,
            attributes: ["name"]
        }
        

    })
    return mapDogs(dataApi).concat(mapDogsDb(dataDb))
}

const getDogsAll = async () => {

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
    return dataMap.concat(mapDogsDb(dataDb));
}

const getById = async (id) => {
    
    let dogMap = {};
    if(!!Number(id)){
        const data = await getApi()
        const dogSearch = data.find(d => d.id === Number(id))
        dogMap = {
            "id": dogSearch.id,
            "name": dogSearch.name,
            "weight": dogSearch.weight.metric,
            "temperament": dogSearch.temperament.split(",").map(e => e.trim()),
            "image": dogSearch.image.url,
            "height": dogSearch.height.metric,
            "life_span": dogSearch.life_span
        }
    }else{
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
        dogMap = {
            "id": findDog.id,
            "name": findDog.name,
            "weight": findDog.weight,
            "temperament": findDog.Temperaments.map(e => e.name),
            "image": findDog.image,
            "height": findDog.height,
            "life_span": findDog.life_span
        }
        
        
    }


    return dogMap
}

const addDog = async (name, height, weight, life_span, temperament) => {
    
    const newDog = await Dog.create({name, height, weight, life_span})
    await newDog.addTemperaments(temperament)    
    return newDog
}




module.exports = {
    getDogsAll,
    searchDogs,
    getById,
    addDog

}