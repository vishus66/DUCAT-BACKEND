const Checkout = require("../models/Checkout")
const User = require("../models/User")
const mailOptions = require("../mail/index")

async function createRecord(req, res) {
    try {
        let data = new Checkout(req.body)
        await data.save()
        let user = await User.findOne({ _id: data.userId })
        let mailOptions = {
            from: process.env.MAIL_SENDER,
            to: user.email,
            subject: "Your Order Has Been Placed : ECOM",
            text: `
                    Hello ${data.name}
                    Your Order Has Been Placed
                    Team Ecom
                `
        }
        transporter.sendMail(mailOptions, (error) => {
            console.log(error)
        })
        res.send({ result: "Done", data: data })
    } catch (error) {
        if (error.errors.user)
            res.status(400).send({ result: "Fail", reason: error.errors.user.message })
        else if (error.errors.subtotal)
            res.status(400).send({ result: "Fail", reason: error.errors.subtotal.message })
        else if (error.errors.shipping)
            res.status(400).send({ result: "Fail", reason: error.errors.shipping.message })
        else if (error.errors.total)
            res.status(400).send({ result: "Fail", reason: error.errors.total.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getRecord(req, res) {
    try {
        let data = await Checkout.find()
            .populate({ path: "user", select: "_id name email phone address pin city state" })
            .populate({
                path: "products.product",
                select: "name color finalprice pic",
                populate: [
                    {
                        path: "maincategory",
                        select: "name -_id",
                    },
                    {
                        path: "subcategory",
                        select: "name -_id",
                    },
                    {
                        path: "brand",
                        select: "name -_id",
                    }
                ]
            }).exec()
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getUserRecord(req, res) {
    try {
        let data = await Checkout.find(
            { user: req.params.userId })
            .populate({ path: "user", select: "_id name email phone address pin city state" })
            .populate({
                path: "products.product",
                select: "name color finalprice pic",
                populate: [
                    {
                        path: "maincategory",
                        select: "name -_id",
                    },
                    {
                        path: "subcategory",
                        select: "name -_id",
                    },
                    {
                        path: "brand",
                        select: "name -_id",
                    }
                ]
            }).exec()
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function updateRecord(req, res) {
    try {
        let data = await Checkout.findOne({ _id: req.params._id })
        if (data) {
            data.paymentMode = req.body.paymentMode ?? data.paymentMode
            data.paymentStatus = req.body.paymentStatus ?? data.paymentStatus
            data.rppid = req.body.rppid ?? data.rppid
            data.orderStatus = req.body.orderStatus ?? data.orderStatus
            if (req.body.orderStatus) {
                let user = await User.findOne({ _id: data.userId })
                let mailOptions = {
                    from: process.env.MAIL_SENDER,
                    to: user.email,
                    subject: `${req.body.orderStatus} : ECOM`,
                    text: `
                            Hello ${data.name}
                            ${req.body.orderStatus}
                            Team Ecom
                        `
                }
                transporter.sendMail(mailOptions, (error) => {
                    console.log(error)
                })
            }
            await data.save()
            res.send({ result: "Done", data: data })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Checkout.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({ result: "Done" })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

module.exports = {
    createRecord,
    getRecord,
    getUserRecord,
    updateRecord,
    deleteRecord
}