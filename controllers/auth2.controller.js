const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next)=>{
    try{
        // console.log(req)
        const token = req.headers.authorization.split(" ")[1]
        if(token){
            const tokenData = jwt.verify(token, "SECRET")
            console.log(tokenData)
            if(tokenData){
                next()
            }else{
                res.status(500).json({
                    success: false,
                    message: "Invalid token"
                })
            }
        }else{
            res.status(500).json({
                success: false,
                message: "Token missing.."
            })
        }
    }catch(error){
        console.log("error:", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {verifyToken}