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
            visitHistory: [],
            createdBy: req.user._id
        })
        res.status(201).render('home', {id: shortID});
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
    return res.redirect(doc.redirectUrl);
    // console.log(rec, ' -------- rec ------ '); 
}

const getAnalytics = async (req,res) => {
    const shortId = req.params.id;
    if(!shortId) return res.status(400).json({message: 'please send url'});
    const doc = await Url.findOne({shortId});
    // return res.json({totalClicks: doc.visitHistory.length, analytics: doc.visitHistory}); // change this line and render home ejs and also add a table to it...
    return res.render('home', {analytics: doc});
}
// const getHome = (req,res) => {
//     res.end('<h1>Hello Hello... From Server...');
// }
const getHome = async (req,res) => {
    if(!req.user) return res.redirect('/login');
    const userId = req.user._id;
    const allIndividualUrls = await Url.find({createdBy: userId});
    res.render('home',{allIndividualUrls});
}

const getAllIds = async (req,res) => {
    const allUrls = await Url.find({});
    res.render('home', {
        urls: allUrls,
    });
}

const searchId = async (req,res) => {
    const shortId = req.params.id;
    if(!shortId) return res.render('home', {
        message: 'Url Not found'
    });
    const rec = await Url.findOne({shortId});
    if(rec)
    res.render('home', {foundUrl: rec.redirectUrl});
    else return res.render('home', {
        message: 'Url Not found'
    });
}

module.exports = {createShortUrl, reditectUrl, getAnalytics, getHome, getAllIds, searchId}