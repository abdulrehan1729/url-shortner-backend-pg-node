const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const salt = process.env.SALT || 12
const tokenKey = process.env.TOKEN_KEY || 'myTokenKey'


const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(403).json({ error: "User Already Exist. Please Try Login" })
        }
        const encryptedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword
        })

        const token = jwt.sign(
            { id: user.id, email },
            tokenKey,
            {
                expiresIn: "2h",
            }
        );
        return res.status(201).json({ firstName: user.firstName, lastName: user.lastName, email, token })


    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!(user && await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }
        const token = jwt.sign(
            { id: user.id, email },
            tokenKey,
            {
                expiresIn: "2h",
            }
        );

        return res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email, token })


    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

module.exports = {
    register,
    login
}