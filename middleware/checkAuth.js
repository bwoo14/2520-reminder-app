module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect("/login")
    }, 
    forwareAuthenticated: function(req,res,next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/reminders")
    }
}