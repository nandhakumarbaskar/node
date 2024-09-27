const userModel = require("../models/user.model")
const { genSaltSync, hashSync, compareSync } = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signUp = async (req, res)=>{
    try{
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)

        const userObj = new userModel({
            username: body.username,
            password: body.password
        })
        const result = await userObj.save()
        if(result){
            res.status(201).json({
                success: true,
                message: "User registered successfully.."
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Error in user creation"
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

const login = async (req, res)=>{
    try{
        const body = req.body
        const result = await userModel.findOne({username: body.username})
        if(result){
            if(compareSync(body.password, result.password)){
                const token = jwt.sign({username: result.username}, "SECRET", { expiresIn: '1hr'})
                res.status(200).json({
                    success: true,
                    message: "Logged in success",
                    token: token
                })
            }else{
                res.status(400).json({
                    success: false,
                    message: "Incorrect password"
                })
            }
        }else{
            res.status(400).json({
                success: false,
                message: "Incorrect username"
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

const verifyToken = async (req, res, next)=>{
    try{
        const token = req.headers.Authorization.split(" ")[1]
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

module.exports = {
    signUp,
    login,
    verifyToken
}