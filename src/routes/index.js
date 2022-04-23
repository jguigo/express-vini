const express = require("express");
const GenderController = require("../controllers/gender.controller");
const PersonController = require("../controllers/person.controller");

const routes = express.Router();

routes.get("/gender", GenderController.listar);

routes.get("/person", PersonController.listar); //é normal utilizar o mesmo que lista tudo pra poder filtrar em uma pesquisa, porém utilizando query-strings;

routes.get("/person100", PersonController.listar100);
routes.put("/person/:id", PersonController.atualizar);

module.exports = routes;
