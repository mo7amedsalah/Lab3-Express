const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var token = req.body.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]) ;
    jwt.verify(token, 'secret',  (err, decoded) => {
        if(err){
            return res.status(401).json({
                message:'Auth failed',
                err:err
            });
        }
        req.userData=decoded;
        next();
    });

};