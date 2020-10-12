const express = require('express')
const helmet = require('helmet')

const userRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')
const server = express()

const protected = require('../auth/protected-mw')
const session = require('express-session')
const sessionConfig = {
    name: 'assignmentCookie',
    secret: process.env.SESSION_SECRET || 'secret handshake',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        secure: process.env.SECURE_COOKIES || false,
    },
    resave: false,
    saveUninitialized: true,
}

server.use(helmet())
server.use(express.json())
server.use(session(sessionConfig))

server.use('/api/auth', authRouter)
server.use('/api/users', protected, userRouter)

server.get('/', (req, res) => {
    res.json({
        api: 'up and running',
        session: req.session
    })
})

module.exports = server