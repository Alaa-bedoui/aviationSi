const horairesRoute = require("express").Router();
const { getAllHoraires, getcrewByColumn } = require("../Controllers/horairesCont");

// GET oneUser by Email
horairesRoute.get("/getall", getAllHoraires);

horairesRoute.get("/getOneHoraire/:userId", getcrewByColumn);

module.exports = horairesRoute;
