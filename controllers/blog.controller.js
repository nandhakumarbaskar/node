const blogModel = require("../models/blog.model")

const createBlog = async (req, res)=>{
    try{
        const body = req.body
        const blogObj = new blogModel({
            "title": body.title,
            description: body.description
        })
        const result = await blogObj.save()
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
        const result = await blogModel.find()
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
        const result = await blogModel.findById(id)
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
        const body = req.body
        const result = await blogModel.findByIdAndUpdate(id, body)
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
        const result = await blogModel.findByIdAndDelete(id)
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
        const result = await blogModel.deleteMany()
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