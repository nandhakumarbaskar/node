const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "oneday"
})

pool.getConnection((error)=>{
    console.log("Error:", error)
})

module.exports = pool.promise()