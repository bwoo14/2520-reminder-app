let database = require("../models/database");
const userController = require("../controller/userController");

let remindersController = {
  list: (req, res) => {
    console.log(req.user)
    const userToShow = userController.getUserById(req.user.id);

    res.render("reminder/index", { reminders: userToShow.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;

    const userToShow = userController.getUserById(req.user.id);
    let searchResult = userToShow.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userToShow.reminders });
    }
  },

  create: (req, res) => {
    const userToShow = userController.getUserById(req.user.id);
    let reminder = {
      id: userToShow.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    userToShow.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const userToShow = userController.getUserById(req.user.id);
    let reminderToFind = req.params.id;
    let searchResult = userToShow.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const userToShow = userController.getUserById(req.user.id);
    let reminderToFind = req.params.id
    let searchResult = userToShow.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    const index = userToShow.reminders.indexOf(searchResult)

    searchResult.title = req.body.title
    searchResult.description = req.body.description
    searchResult.completed = (req.body.completed === 'true')

    userToShow.reminders[index] = searchResult
    res.render("reminder/index", { reminders: userToShow.reminders });
  },

  delete: (req, res) => {
    const userToShow = userController.getUserById(req.user.id);
    let reminderToFind = req.params.id
    let searchResult = userToShow.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    const index = userToShow.reminders.indexOf(searchResult);
    userToShow.reminders.splice(index, 1)
    res.render("reminder/index", { reminders: userToShow.reminders });
  },
};

module.exports = remindersController;
