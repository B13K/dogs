const { Router } = require("express");

const { getDogsAll, searchDogs, getById, addDog } = require("../controllers/dogsControllers");

const dogsRouter = Router();


dogsRouter.get("/", async (req,res) => {
    const {name} = req.query;
    let data;
    try{
        name ? data = await searchDogs(name)
             : data = await getDogsAll();

        res.status(200).json(data)

    }catch(err){
        res.status(400).json({error: err.message})
    }
})

dogsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try{
        const data = await getById(id)
        res.status(200).json(data);
    }catch (err) {
        console.log(err)
        res.status(400).json({error: err.message})
    }
})

dogsRouter.post("/", async (req, res) => {
    const {name, height, weight, life_span, temperament} = req.body;
    try {
        const newDog = await addDog(name, height, weight,life_span, temperament)
        res.status(200).json(newDog)
    } catch (err) {
        console.log(err)
        res.status(400).json({error: err.message})
    }
})


module.exports = dogsRouter;