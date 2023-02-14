const { Router } = require("express");
const { addTemperament, getTemperamentAll } = require("../controllers/temperamentsControllers");



const temperamentsRouter = Router();



// Retorna todos lo valores de la tabla Temperamento
temperamentsRouter.get("/", async (res, post) => {
    try {
        await getTemperamentAll();
        res.status(200).json({msg: "Temperamentos agregados correctamente"})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

// Agrega todos los temperamentos de la api externa a la base de datos
temperamentsRouter.post("/", async (req, res) => {
    try {
        const tempAll = await addTemperament();
        res.status(201).json(tempAll)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})





module.exports = temperamentsRouter;