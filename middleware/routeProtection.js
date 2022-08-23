// verify user session go next if valid

module.exports = function routeProtection (req,res,next) {

    console.log(req.session)
    console.log(req.headers)

    if(req.session.loggedIn){
        next()
    } else {
        const err = new Error('You must be logged in')
        next(err)
    }

}