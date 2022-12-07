let database = require("../database");
const passport = require("../middleware/passport");
const {userModel} = require("../models/database")

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
     // Implement this code
   passport.authenticate("local", {successRedirect: "/reminders", failureRedirect: "/login"})(req, res, next);
  },

  registerSubmit: (req, res) => {
     // Implement this code
    const email = req.body.email
    const password = req.body.password

    userObject = {
      id:1,
      name: "Harkarn",
      email: email,
      password: password,
      reminders: []
    }
    userModel.createNewUser(userObject)
    res.redirect("/login")
  },
};

module.exports = authController;
