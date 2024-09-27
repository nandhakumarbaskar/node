const express = require("express")
const app = express()

require("dotenv").config()
require("./config/db.config")

const bodyParser = require("body-parser")

app.use(bodyParser.json())


const blogRouter = require("./routes/blog.routes")
const authRouter = require("./routes/auth.routes")
const { verifyToken } = require("./controllers/auth2.controller")

const blogMysqlRouter = require("./routes/mysqlBlog.routes")

app.use("/api/blog", verifyToken, blogRouter)
app.use("/api/mysql/blog", blogMysqlRouter)
app.use("/api", authRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Server up and running on port ${process.env.PORT}`)
})