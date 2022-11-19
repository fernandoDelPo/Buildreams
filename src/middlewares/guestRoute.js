module.exports = (req, res, next) => {
    // El usuario existe en session
    if (req.session.user) {
        res.redirect('/users/profile');
    } else {
        next();
    }
}
