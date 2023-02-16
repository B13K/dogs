const { Router } = require("express");

const temperamentHandlers = require("../handlers/temperamentsHandlers")

const temperamentsRouter = Router();



temperamentsRouter.get("/", temperamentHandlers.getAll)
temperamentsRouter.post("/", temperamentHandlers.addAll)


module.exports = temperamentsRouter;