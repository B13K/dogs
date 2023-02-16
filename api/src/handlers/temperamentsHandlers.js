const { getTemperamentAll, addTemperamentAll} = require("../controllers/temperamentsControllers")

const temperamentHandlers = {

    getAll: async (req, res) => {
                try{
                    const temperaments = await getTemperamentAll()
                    res.status(200).json(temperaments)
                }catch(err){
                    res.status(400).json({error: err.message})
                }
            },

    addAll: async (req, res) => {
                const { name } = req.body
                try {
                    name ? await addTemperament(name)
                         : await addTemperamentAll()

                    res.status(200).json("Congratulations, temperament add")
                } catch (err) {
                    res.status(400).json({error: err.message})
                }
            }


};



module.exports = temperamentHandlers;