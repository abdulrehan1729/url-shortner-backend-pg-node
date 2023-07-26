require("dotenv").config();
const { urls } = require("../models");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { createClient } = require('redis')


const shortBaseUrl = process.env.BASE_URL || "http://localhost:8000";

let redisClient

(async () => {
    redisClient = createClient()
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect()
})();


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

        let url = await urls.findOne({ where: { longUrl, userId: req.user.id } })
        if (url) {
            response = { shortUrl: url.shortUrl, urlCode: url.urlCode }
        } else {
            url = await urls.create({ userId: req.user.id, longUrl, shortUrl, urlCode })
            response = { shortUrl: url.shortUrl, urlCode: url.urlCode }
            //The redis keys will be expires in every two hours
            await redisClient.set(urlCode, JSON.stringify(url), 'EX', 60 * 60 * 2, (err) => {
                //cache for 2 hours
                if (err) {
                    return res.status(500).send('Server error');
                }
            });
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

        let redisResp = JSON.parse(await redisClient.get(shortUrl))
        if (redisResp) {
            return res.redirect(redisResp.longUrl)
        }

        let response = await urls.findOne({ where: { urlCode: shortUrl } })
        if (response) {
            //The redis keys will be expires in every two hours
            await redisClient.set(shortUrl, JSON.stringify(response), 'EX', 60 * 60 * 2, (err) => {
                //cache for 2 hours
                if (err) {
                    return res.status(500).send('Server error');
                }
            });
            return res.redirect(response.longUrl)
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