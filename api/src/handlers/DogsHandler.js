const { getDogByName,getDogsAll, getDogByIdApi, getdogByIdDb, addDog } = require("../controllers/dogsControllers")

const dogsHandlers = {


    getDogs: async (req, res) => {
        const { name } = req.body
        try {
            let arrDogs;
            name ? arrDogs = await getDogByName(name)
                 : arrDogs = await getDogsAll()
            res.status(200).json(arrDogs)
            
        } catch (err) {
            res.status(400).json({error: error.message})
        }
    },

    getById: async (req,res) => {
        const { id } = req.body
        try {
            let dogById;
            
            parseInt(id) === NaN ? dogById = await getDogByIdApi(id)
                                 : dogById = await getdogByIdDb(id)

            res.status(200).json(dogById);            

        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },

    addDog: async (req,res) => {
        const { name, height, weight, life_span, temperament } = req.body
        if(!name || !height || !weight || life_span || !temperament.length){
            throw new Error("Faltan datos para gregar una nueva raza")
        }
        try {
            const newDog = await addDog(req.body)
            res.status(200).json(newDog)
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
}

module.exports = dogsHandlers;