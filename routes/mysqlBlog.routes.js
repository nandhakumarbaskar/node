const blogController = require("../controllers/mysqlblog.controller")
const router = require("express").Router()

router.post("/", blogController.createBlog)
router.get("/", blogController.getBlogs)
router.get("/:id", blogController.getBlogById)
router.put("/:id", blogController.updateBlogById)
router.delete("/:id", blogController.deleteBlogById)
router.delete("/", blogController.deleteAll)

module.exports = router