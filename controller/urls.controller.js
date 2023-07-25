require("dotenv").config();
const { urls } = require("../models");
const validUrl = require("valid-url");
const shortid = require("shortid");

const shortBaseUrl = process.env.BASE_URL || "http://localhost:8000";

const createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body
        const urlCode = shortid.generate();
        const shortUrl = `${shortBaseUrl}/${urlCode}`
        let response

        if (!validUrl.isUri(shortBaseUrl)) {
            return res.status(401).json({ error: "Invalid base url for short url" })
        }
        if (!validUrl.isUri(longUrl)) {
            return res.status(401).json({ error: "Invalid url provided" })
        }

        let url = await urls.findOne({ where: { longUrl } })
        if (url) {
            response = { shortUrl: url.shortUrl, urlCode: url.urlCode }
        } else {
            url = await urls.create({ userId: req.user.id, longUrl, shortUrl, urlCode })
            response = { shortUrl: url.shortUrl, urlCode: url.urlCode }
        }
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }


}
const getShortUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params
        let url = await urls.findOne({ where: { urlCode: shortUrl } })
        if (url) {
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).send("Not Found")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

module.exports = {
    createShortUrl,
    getShortUrl
}