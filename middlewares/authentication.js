const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = async (req, res, next) => {

    // console.log("haii", req.headers)
    try{
        let {access_token} = req.headers

        if(!access_token) {
            throw({name: "NoToken"})
        }
        let payload = verifyToken(access_token)
        let user = await User.findByPk(payload.id)
        if(!user){
            throw({name: "Unauthorized" })
        }
        req.user = {
            id: user.id,
            role: user.role
        }
        console.log("haii", user)
        next()
    } catch (error) {
       next(error)
    }
}


module.exports = authentication