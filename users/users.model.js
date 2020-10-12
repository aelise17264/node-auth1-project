const db = require ('../database/connection')

module.exports = {
    addUser,
    findUser,
    findUserBy,
    findUserById
}

function findUser(){
    return db('users').select('id', 'username').orderBy('id')
}

function findUserBy(filter){
    return db('users').where(filter).orderBy('id')
}

function addUser(user){
    return findUserById(id)
}

function findUserById(id){
    return db('users').where({id}).first()
}