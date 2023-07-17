const express = require('express')
const userRouter = require("./user")
const tripRouter = require("./trip")
const journalRouter = require("./journal")
const authentication = require('../middleware/authentication')
const router = express.Router()
// pasang middleware
// tinggal nyalain
router.use("/user", userRouter)
router.use(authentication)
router.use("/trip", tripRouter)
// <<<<<<< journalfeatures
router.use("/journal", journalRouter)





module.exports = router