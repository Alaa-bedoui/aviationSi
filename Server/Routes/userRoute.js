const userRoute = require("express").Router();
const { createUser, loginUser } = require("../Controllers/userCont");

// GET oneUser by Email
userRoute.post("/signUp", createUser);

userRoute.post("/login", loginUser);

module.exports = userRoute;
