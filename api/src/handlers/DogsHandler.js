//const { getDogByName,getDogsAll, getDogByIdApi, getDogByIdDb, addDog } = require("../controllers/dogsControllers")
const dogsControllers = require("../controllers/dogsControllers")
const dogsHandlers = {

    getDogs: async (req, res) => {
        const { name } = req.query
        try {
            let arrDogs;
            name ? arrDogs = await dogsControllers.getDogByName(name)
                 : arrDogs = await dogsControllers.getDogsAll()
            res.status(200).json(arrDogs)
            
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },

    getById: async (req,res) => {
        const { id } = req.params
        try {
            let dogById;
            !Number(id) ? dogById = await dogsControllers.getDogByIdDb(id)
                            : dogById = await dogsControllers.getDogByIdApi(id)

            res.status(200).json(dogById);            

        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },

    addDog: async (req,res) => {
        const { name, height, weight, life_span, temperament } = req.body
        if(!name || !height || !weight || !life_span || !temperament.length){
            throw new Error("Faltan datos para gregar una nueva raza")
        }
        try {
            const newDog = await dogsControllers.addDog(name, height, weight, life_span, temperament)
            res.status(200).json(newDog)
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
    
}

module.exports = dogsHandlers;