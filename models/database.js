const database = [
    {
        id:1,
        name: "hk the first",
        email: "hk1@gmail.com",
        password: "#hk1",
        reminders:[{id: 1, title: "me", description:"me who else", completed: false}]
    },
    {
        id:2,
        nmae: "steve job",
        email: "ownsApple@gmail.com",
        password: "apple4Life",
        reminders:[{id:2, title:"iphone", description:"better than android", completed:false}]
    }
]

const userMode = {
    findOne: (email) => {
        const user = database.find((user) => user.email === email)
        if (user) {
            return user
        }
        throw new Error(`Can't find user with that email: ${email}`)
    },
    findById: (id) => {
        const user = database.find((user) => user.id === id);
        if (user) {
          return user;
        }
        throw new Error(`Couldn't find user with id: ${id}`);
      },
      createNewUser: (userObj) => {
        database.push(userObj);
      }
}

module.exports = {database, userMode}