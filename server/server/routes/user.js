const express = require('express')
const { UserController } = require('../controller/userController')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/register', UserController.register) // D
router.post('/login', UserController.login) // D
router.use(authentication)
router.get("/fetch", UserController.fetchFriends) // D
router.post("/add", UserController.addFriend) // D
router.delete("/remove", UserController.removeFriend) // D
router.post("/search", UserController.searchUser) // D

module.exports = router