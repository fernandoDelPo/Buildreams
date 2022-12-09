

module.exports = (req, res, next) => {
    // El usuario existe en session
    if (req.session.userLog) {
        res.redirect('/users/profile');
    } else {
        next();
    }
}
