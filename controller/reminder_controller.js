const userController = require("../controller/userController");
let database = require("../database");

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
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const userVisibility = userController.getUserById(req.user.id);
    let reminderToFind = req.params.id
    let searchResult = userVisibility.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    const index = userVisibility.reminders.indexOf(searchResult)

    searchResult.title = req.body.title
    searchResult.description = req.body.description
    searchResult.completed = (req.body.completed === 'true')

    userVisibility.reminders[index] = searchResult
    res.render("reminder/index", { reminders: userVisibility.reminders });
  },

  delete: (req, res) => {
    const userVisibility = userController.getUserById(req.user.id);
    let reminderToFind = req.params.id
    let searchResult = userVisibility.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    const index = userVisibility.reminders.indexOf(searchResult);
    userVisibility.reminders.splice(index, 1)
    res.render("reminder/index", { reminders: userVisibility.reminders });
  },
};

module.exports = remindersController;
