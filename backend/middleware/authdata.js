const jwt = require('jsonwebtoken')
const JWT_SECRET = "switchisonforunlimitedtime"
const fetchUser =  (req, res, next)=>{
     const token = req.header('auth-token')
     if(!token){
         res.status(401).send({error: 'Access denied because of unauthorized login'})
     }
     try {
         const data =  jwt.verify(token, JWT_SECRET )
         req.user = data.user
         
     } catch (error) {
        res.status(401).send({error: 'Access denied because of unauthorized login'})
         }
    next()

}

module.exports = fetchUser