const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const userControl = require("../controller/userController")
const localLogin = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        const user = userControl.getUserByEmailIdAndPassword(email, password);
        return user
            ? done(null, user)
            : done(null, false, {
                message: "Your login details are invalid. Please try again",
            })
    }
)

passport.serializeUser(function (user,done){
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    let user = userControl.getUserById(id)
    if (user) {
        done(null, user)
    } else {
        done({message: "User not found"}, null)
    }
})

module.exports = passport.use(localLogin)