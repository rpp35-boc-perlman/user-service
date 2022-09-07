// verify user session go next if valid

module.exports = function routeProtection (req,res,next) {
    if(req.session.loggedIn){
        next()
    } else {
        const err = new Error('You must be logged in')
        err.status = 401
        next(err)
    }

}