const { Router } = require("express");
const dogsHandlers = require("../handlers/DogsHandler")

const dogsRouter = Router();

dogsRouter.get("/", dogsHandlers.getDogs);
dogsRouter.get("/:id", dogsHandlers.getById);
dogsRouter.post("/", dogsHandlers.addDog);



module.exports = dogsRouter;