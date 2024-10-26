const crewRoute = require("express").Router();
const { getAllcrews, getcrewByColumn } = require("../Controllers/crewCont.js");

// GET oneUser by Email
crewRoute.get("/getallUsers", getAllcrews);

crewRoute.get("/oneUserBy/:query/:value", getcrewByColumn);

module.exports = crewRoute;
