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


const inchToCen = (num) => {
    return Math.floor(num*2.54)
}

const poundsToKg = (num) => {
    return Math.round(num/2.205)
}

const filterByName = (data, name) => {
    const filter = data.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
    return filter;
}

const mapDogs = (dataApi) => {
    let data = dataApi.map( d => {
        let [minWeight, maxWeight] = ["", ""]


        if(d.weight.metric === "NaN") {
            [minWeight, vacio, maxWeight] = d.weight.imperial.trim()
                                                    .split(" ");
            minWeight = poundsToKg(minWeight);
            maxWeight = poundsToKg(maxWeight)
        }
        else{
            [minWeight, maxWeight] = d.weight.metric.trim()
                                                    .split("-");
        }
        if(maxWeight === undefined) maxWeight = minWeight
        
        // let [minHeight, maxHeight] = d.height.metric.trim()
        //                                               .split("-");
        // if(maxHeight === undefined) maxHeight = minHeight

        return {
            id: d.id,     
            name: d.name,
            weightMax:  Number(maxWeight),
            temperament: d.temperament?.
                                        split(",")
                                        .map(e => e.trim()),
            image: d.image?.url
                                    }
                                })
    return data;
}

const mapDogsDb = (dataDB) => {
    let data = dataDB.map( d => ({
        id: d.id,     
        name: d.name,
        weightMax: d.weightMax,
        temperament: d.Temperaments.map(e => e.name),
        image: d.image
    }))
    return data;
}

const dogsControllers = {

    getDogByName: async (name) => {
        const dataApi = await getApi();
        const filterDataApi = filterByName(dataApi, name)
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
        return mapDogsDb(dataDb).concat(mapDogs(filterDataApi))
    },

    getDogsAll: async () => {

        let dataApi = await getApi();
        console.log(dataApi.length)
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

        let [minWeight, maxWeight] = ["", ""]

        if(dogSearch.weight.metric === "NaN") {
            [minWeight, vacio, maxWeight] = dogSearch.weight.imperial.trim()
                                                    .split(" ");
            minWeight = poundsToKg(minWeight);
            maxWeight = poundsToKg(maxWeight)
        }
        else{            
            [minWeight, maxWeight] = dogSearch.weight.metric.trim().split("-")
        }

        
        const [minHeight, maxHeight] = dogSearch.height.metric.trim().split("-")
        
        const dogMap = {
            "id": dogSearch.id,
            "name": dogSearch.name,
            "heightMin": minHeight,
            "heightMax": maxHeight,
            "weightMin": minWeight, 
            "weightMax": maxWeight, 
            "temperament": dogSearch.temperament?.split(",").map(e => e.trim()),
            "image": dogSearch.image.url,
            "life": dogSearch.life_span.split("year")[0]
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
            "weightMin": findDog.weightMin,
            "weightMax": findDog.weightMax,
            "temperament": findDog.Temperaments.map(e => e.name),
            "image": findDog.image,
            "heightMin": findDog.heightMin,
            "heightMax": findDog.heightMax,
            "life": findDog.life
        }
        return dogMap;        
    },

    addDog: async (name, heightMin, heightMax, weightMin, weightMax, life, image, temperaments) => {
        const values = []
        temperaments.forEach(t => {
            values.push(...Object.values(t))
        });
        
        image = image === "" ? undefined : image
    
        const newDog = await Dog.create({name, heightMin, heightMax, weightMin, weightMax, life, image})
        await newDog.addTemperaments(values)    
        return newDog
    }
}



module.exports = dogsControllers