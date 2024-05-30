const CheckoutRouter = require("express").Router()
const { verifyBuyer, verifyAdmin } = require("../middlewares/authentication")

const { createRecord, getRecord, getUserRecord, updateRecord, deleteRecord } = require("../controller/CheckoutController")


CheckoutRouter.post("/", verifyBuyer, createRecord)
CheckoutRouter.get("/", verifyAdmin, getRecord)
CheckoutRouter.get("/:userId", verifyBuyer, getUserRecord)
CheckoutRouter.put("/:_id", verifyAdmin, updateRecord)
CheckoutRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = CheckoutRouter
