let database = require("../models/database").userModel;
const passport = require("../middleware/passport");
const { userModel } = require("../models/database");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    passport.authenticate("local", {successRedirect: "/reminders", failureRedirect: "/login"})(req, res, next);
  },

  registerSubmit: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    userObj = {
      id: 1,
      name: "Pepe",
      email: email,
      password: password,
      reminders: []
    }
    // Call the create new user function to create a new usere
    userModel.createNewUser(userObj)
    // Redirec to login page
    res.redirect("/login")
  },
};

module.exports = authController;
