const { createShortUrl, getShortUrl } = require("../controller/urls.controller");
const { login, register } = require("../controller/user.controller");
const { authenticate } = require("../middlewares/auth");
const { validateUserRegistration, validateUserLogin, validateUrl } = require("../middlewares/validate");
const router = require("express").Router();


//User routes
router.post('/user/register', validateUserRegistration, register)
router.post('/user/login', validateUserLogin, login)

//Url routes
router.post('/shorten', authenticate, validateUrl, createShortUrl)
router.get("/redirect/:shortUrl", getShortUrl)

module.exports = router