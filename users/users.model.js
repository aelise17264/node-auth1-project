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

async function addUser(user){
   try{
    const [id] = await db('users').insert(user, "id")

    return findUserById(id)
   }catch(error){
       throw error
   }
}

function findUserById(id){
    return db('users').where({id}).first()
}