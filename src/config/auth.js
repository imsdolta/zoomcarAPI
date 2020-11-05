module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(200).send("error_msg', 'Please log in to view that resource");
    }
};