module.exports = (req, res, next) => {
    if(req.session.username){
        next()
    }else{
        res.status(401).json({you: 'did not say the magic word'})
    }
}