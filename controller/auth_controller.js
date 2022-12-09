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
      name: "Deez",
      email: email,
      password: password,
      reminders: []
    }
    userModel.createNewUser(userObj) // Call the create new user function to create a new user. returns a user object.
    res.redirect("/login") // This will redirect to the login page.
  },
};

module.exports = authController;
