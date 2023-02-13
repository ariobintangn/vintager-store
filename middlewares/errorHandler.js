errorHandler = (err, req, res, next) => {
    
    console.log(err, "<<<<< Hai dari error handler")
        if(err.name == "SequelizeUniqueConstraintError" || err.name == "SequelizeValidationError"){ 
            res.status(400).json({message: err.errors[0].message})
        } else if (err.name == "NoToken") {
            res.status(401).json({message: "Please Login"})
        } else if (err.name == "Unauthorized" || err.name == "JsonWebTokenError"){
            res.status(401).json({message: "Invalid Token"})
        } else if (err.name == "invalid email/password"){
            res.status(401).json({message: "user not found!"})
        } else if (err.name == "Forbidden"){
            res.status(403).json({message: "access denied!"})
        } else if (err.name == "ProductIdNotFound") {
            res.status(404).json({message: "Product Not Found"})
        } else if (err.name == "product name has already been used!") {
            res.status(400).json({message: "product name must be unique"})
        }else if (err.name == "wrong_password") {
            res.status(404).json({message: "incorrect password!"})
        } else if (err.name == "NotFound") {
            res.status(404).json({message: "Not Found"})
        } else if (err.name == "NoFavourites"){
            res.status(404).json({message: "You don't have any favourites yet!"})
        } else if (err.name == "SequelizeForeignKeyConstraintError"){
            res.status(404).json({message: "product not found!"})
        }else if (err.name == "notCustomer"){
            res.status(403).json({message: "sorry, this feature is for customers only!"})

        }else {
            res.status(500).json({message: "Internal server error!!"})
        }
}     


module.exports = {errorHandler}