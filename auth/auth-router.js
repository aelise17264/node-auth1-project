const router = require('express').Router()
const bcrypt = require('bcrypt')
const Users = require('../users/users.model')

router.post('/register', (req, res) => {
    const credentials = req.body;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.password, rounds)
    credentials.password = hash
    
    Users.addUser(credentials)
    .then(user => {
        res.status(201).json({data: user})
    })
    .catch(error => 
        res.json({message: error.message}))

})

router.post('/login', (req,res) => {
    const credentials = req.body;

    Users.findUserBy({username: credentials.username})
    .then(users => {
        const user = users[0]

        if(user && bcrypt.compareSync(credentials.password, user.password)){
            req.session.username = user.username
            res.status(200).json({
                message: 'Welcome to the club',
                username: req.username
            })
        }else{
            res.status(401).json({message: 'who are you'})
        }
    }).catch(error => res.json({message: error.message}))
})

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(error => {
            if(error){
                res.status(500).json({message:'logout failed, walk around the block and try again'})
            }else{
                res.status(204).end()
            }
        })
    }else{
        res.status(204).end()
    }
})

module.exports = router;
