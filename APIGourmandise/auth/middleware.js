//Swagger UI
//swagger.io/tools/swagger-ui

const jwt = require('jsonwebtoken');

const extraireToken = authorization => {
    if (typeof authorization !== 'string') {
        return false
    }
    const match = authorization.match(/(bearer)\s+(\S+)/i)

    return match && match[2]
}
const VerifToken = (req, res, next) => {
    const token = req.headers.authorization && extraireToken(req.headers.authorization)
    if (!token){
        return res.status(401).json({message : "Impossible de passer ici."})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err){
            return res.status(401).json({message : "Token invalid."})
        }

        next()
    })
}

module.exports = VerifToken