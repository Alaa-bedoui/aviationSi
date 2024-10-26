const express = require("express");
const db = require("./database/index.js");
const PORT = 3000;
const app = express();
const cors = require("cors");

const crewRoute = require("./Routes/crewRoute.js");
const horaireRoute = require("./Routes/horairesRoute.js");
const userRoute = require("./Routes/userRoute.js");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.use("/api", crewRoute);
app.use("/api", horaireRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
