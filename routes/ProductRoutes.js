const ProductRouter = require("express").Router()
const { verifyAdmin } = require("../middlewares/authentication")

const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controller/ProductController")
const { uploadProduct } = require("../middlewares/fileUploadMiddleware")

ProductRouter.post("/", uploadProduct.array("pic"), verifyAdmin, createRecord)
ProductRouter.get("/", getRecord)
ProductRouter.get("/:_id", getSingleRecord)
ProductRouter.put("/:_id", uploadProduct.array("pic"), verifyAdmin, updateRecord)
ProductRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = ProductRouter
