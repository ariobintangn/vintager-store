const { Product, Favourite } = require("../models")

const authorization = async (req, res, next) => {
    try {
        if (req.user.role == "admin") {
            next()
        } else {
            const product = await Product.findByPk(req.params.id);

            if (!product) {
                throw ({ name: "ProductIdNotFound" })
            }

            if (req.user.id == product.userId) {
                next()
            } else {
                throw ({ name: "Forbidden" })
            }
        }
    } catch (error) {
        next(error)
    }
}
const favAuthorization = async (req, res, next) => {
    try {
        if (req.user.role !== "customer") {
            throw{name: "notCustomer"}
        } else {
            console.log(req.user.id, "PARAMS DOT ID");
            const favourites = await Favourite.findAll({
                where: {
                    UserId: req.user.id
                }
                
            });

            if (favourites === []) {
                console.log("MASUK FAVOURITE NULL");
                throw ({ name: "NoFavourites" })
            } else if (favourites !== null) {
                console.log("MASUK FAVOURITE ADA");
                next()
            } else {
                throw ({ name: "Forbidden" })
            }
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}
const checkAdmin = async (req, res, next) => {
    try {
        const { role } = req.user

        if (role !== "admin") {
            throw ({ name: "Forbidden" })
        }

        next()

    } catch (error) {
        next(error)
    }
}
module.exports = {
    authorization,
    checkAdmin,
    favAuthorization
}