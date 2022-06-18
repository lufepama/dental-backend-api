const db = require('./../database/models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/auth')
const User = db.users

exports.checkUserExist = async (req, res, next) => {

    const userData = req.body

    if (!userData.username) {
        res.status(404).send({ message: 'Esta informacion es necesaria' })
        return
    }

    User.findOne({ username: userData.username })
        .exec((err, user) => {
            if (err) {
                res.status(404).send({ message: 'Ha habido un error' })
                return;
            }

            if (user) {
                req.user = user
                next()
                return
            }
            res.status(404).send({ message: 'El usuario no existe..' })
        })

}

exports.passwordValidation = async (req, res, next) => {

    const userData = req.body
    const passwd = userData.password

    User.findOne({ username: userData.username })
        .exec((err, user) => {
            if (err) {
                res.status(404).send({ message: 'Esta informacion es necesaria' })
                return;
            }

            const passwdIsValid = bcrypt.compareSync(passwd, user.password)

            if (!passwdIsValid) {
                res.status(200).send({ error: 'El usuario o la password son incorrectas' })
                return
            }
            req.user = user
            next()
            return
        })

}

exports.checkUserIsDuplicate = async (req, res, next) => {

    const userData = req.body

    User.findOne({ username: userData.username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
            }
            if (!user) {
                next()
                return;
            }
            res.status(200).send({ message: 'Problema... el usuario ya esta en uso', duplicate: true })
        })
}

exports.tokenValidation = async (req, res, next) => {

    const userToken = req.headers['x-access-token']


    if (!userToken) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(userToken, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "No tienes autorizacion...!" });
        }
        req.userId = decoded.id
        next()
    })

}   