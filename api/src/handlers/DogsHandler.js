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
            console.log(err)
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
            console.log(err)
            res.status(400).json({error: err.message})
        }
    },

    addDog: async (req,res) => {
        const { name, heightMin, heightMax, weightMin, weightMax, life, temperaments, image } = req.body
        
        try {
            if(!name || !heightMin || !heightMax || !weightMin || !weightMax || !life){
                throw new Error("Faltan datos para gregar una nueva raza")
            }
            const newDog = await dogsControllers.addDog(name, heightMin, heightMax, weightMin, weightMax, life, image, temperaments)
            res.status(200).json("create dog successfull")
        } catch (err) {
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    }
    
}

module.exports = dogsHandlers;