const mongoose = require('mongoose');
const Url = require('../models/url.model');
const shortid = require('shortid');

const createShortUrl = async (req, res) => {
    const redirectUrl = req.body.url;
    if(!redirectUrl) return res.status(400).json({message: 'Please provide Url.'});
    try {
        const urlObj = await Url.create({
            shortId: shortid(),
            redirectUrl,
            visitHistory: []
        })
        res.status(201).json({message: 'short url created..'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports = {createShortUrl}