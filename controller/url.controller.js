const mongoose = require('mongoose');
const Url = require('../models/url.model');
const shortid = require('shortid');

const createShortUrl = async (req, res) => {
    const redirectUrl = req.body.url;
    if(!redirectUrl) return res.status(400).json({message: 'Please provide Url.'});
    const shortID = shortid();
    try {
        const urlObj = await Url.create({
            shortId: shortID,
            redirectUrl,
            visitHistory: []
        })
        res.status(201).json({id: shortID});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const reditectUrl = async (req,res) => {
    const shortId = req.params.id;
    if(!shortId) return res.status(400).json({message: 'Please send valid url'});
    // const rec = await Url.findOne({shortId});
    const doc = await Url.findOneAndUpdate({shortId},{
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        } 
    }
    );
    res.redirect(doc.redirectUrl);
    // console.log(rec, ' -------- rec ------ '); 
}

const getAnalytics = async (req,res) => {
    const shortId = req.params.id;
    if(!shortId) return res.status(400).json({message: 'please send url'});
    const doc = await Url.findOne({shortId});
    return res.json({totalClicks: doc.visitHistory.length, analytics: doc.visitHistory});
}
// const getHome = (req,res) => {
//     res.end('<h1>Hello Hello... From Server...');
// }
const getHome = async (req,res) => {
    res.render('home');
}

const getAllIds = async (req,res) => {
    const allUrls = await Url.find({});
    console.log(allUrls, ' ---------- all urls ------ ');
    res.render('home', {
        urls: allUrls,
    });
}

module.exports = {createShortUrl, reditectUrl, getAnalytics, getHome, getAllIds}