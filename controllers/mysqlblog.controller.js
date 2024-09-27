const mysql = require("../config/mysqldb.config")

const createBlog = async (req, res)=>{
    try{
        const { title, description, isPublished} = req.body
        const [result, result2] = await mysql.query("insert into blogs (title, description, isPublished) values(?, ?, ?)", [title, description, isPublished])
console.log("result", result, result2)
        if(result){
            res.status(201).json({
                success: true,
                message: "Blog created successfully..."
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Error in createBlog"
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

const getBlogs = async (req, res)=>{
    try{
        const [result] = await mysql.query(`select * from blogs`)
        if(result){
            res.status(200).json({
                success: true,
                data: result
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Error in getBlogs"
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

const getBlogById = async (req, res)=>{
    try{
        const {id} = req.params
        const [result, result2] = await mysql.query(`select * from blogs where id=?`, [id])
        console.log("result", result, result2)
        if(result){
            res.status(200).json({
                success: true,
                data: result
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Error in getBlogById"
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

const updateBlogById = async (req, res)=>{
    try{
        const {id} = req.params
        const {title, description, isPublished } = req.body
        const [result, result2] = await mysql.query(`update blogs set title=?, description=?, isPublished=? where id=?`, [title, description, isPublished, id])
        console.log("result", result, result2)
        if(result){
            res.status(200).json({
                success: true,
                data: result
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Error in updateBlogById"
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

const deleteBlogById = async (req, res)=>{
    try{
        const {id} = req.params
        const [result, result2] = await mysql.query(`delete from blogs where id=?`, [id])
        console.log("result", result, result2)
        if(result){
            res.status(200).json({
                success: true,
                data: result
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Error in deleteBlogById"
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

const deleteAll = async (req, res)=>{
    try{
        const [result, result2] = await mysql.query(`delete from blogs`)
        console.log("result", result, result2)
        if(result){
            res.status(200).json({
                success: true,
                data: result
            })
        }else{
            res.status(500).json({
                success: false,
                message: "Error in deleteAll"
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
    createBlog,
    getBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    deleteAll
}