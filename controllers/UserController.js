if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const { User } = require('../models')
const { compareHash } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt')

class UserController {

    static async users(req, res, next) {
        try {
            const users = await User.findAll({
            
            })

            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        console.log("ini di controller");
        try {
            const { username, email, password, phoneNumber, address, role, balance } = req.body;
            const createUser = await User.create({
                username,
                email,
                password,
                role,
                phoneNumber: phoneNumber,
                address: address,
                balance
            })

            res.status(201).json({ message: `user with email ${createUser.email} has been created` })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            console.log(req.body, "MASUK CONTROLLER");
            const { email, password } = req.body
            const findUser = await User.findOne({
                where: {
                    email
                }
            });

            if (!findUser) {
                throw ({ name: "invalid email/password" });
            };

            const comparePassword = compareHash(password, findUser.password);
            console.log(comparePassword);
            if (!comparePassword) {
                throw ({ name: "invalid email/password" });
            };

            const payload = {
                id: findUser.id
            }

            const access_token = createToken(payload)

            res.status(200).json({
                access_token: access_token,
            })
        } catch (error) {
            next(error)
        }
    }

    static async googleSignIn(req, res, next) {
        console.log("sampai tujuan");
        try {
            const { credential } = req.body
            console.log(credential, "<<< THIS IS HEADERS");
            const client = new OAuth2Client(process.env.CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.CLIENT_ID,
                // const {google_token} = req.headers
                // console.log(req.headers, "<<< THIS IS HEADERS");
                // const client = new OAuth2Client(process.env.CLIENT_ID)
                // const ticket = await client.verifyIdToken({
                //     idToken: google_token,
                //     audience: process.env.CLIENT_ID, 
            });
            const payload = ticket.getPayload();
            console.log(payload, "<<<<PAYLOAD");
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "ini_dari_google",
                    role: "staff",
                    phoneNumber: null,
                    address: null
                },
                hooks: false,

            })
            const access_token = createToken({
                id: user.id
            })
            const email = user.email
            res.status(200).json({ access_token, email })
            console.log(user, "<<< user");
            console.log(created, "<<< created");
            console.log(access_token, email, "<<< TOKEN");
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "internal server error" })
        }
    }
}

module.exports = UserController