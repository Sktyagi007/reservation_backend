const jwt = require('jsonwebtoken');


function generateToken(payload,secretKey){
    return jwt.sign(payload,secretKey,{expiresIn:'1h'});
}

// function verifyJToken(req,res,next){
//     try {
//         let data = req.body;
//         if (data.hasOwnProperty('userID')){
//             next();
//         }
//         else{
//             const authHeader = req.headers.authorization;
//             const token = authHeader && authHeader.split(' ')[1];
//             // Verify the token
//             const decoded = jwt.verify(token, config.jwt_secret);
//             req.body.userID = decoded.userID;
//             next();
//         }
//     } catch (err) {
//         if (err.name === 'JsonWebTokenError') {
//             res.status(200).json({auth: false,description: "Invalid Token"});
//         } else if (err.name === 'TokenExpiredError') {
//             res.status(200).json({ auth: false, description: "Token Expired"});
//         } else {
//             res.status(200).json({ auth: false, description: "Invalid Token" });
//         }
//     }
// }


module.exports = {
    generateToken,
    // verifyJToken
}