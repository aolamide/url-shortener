const { urlModel : Url } = require('../models/url');
const validUrl = require('valid-url');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


const baseUrl = process.env.BASE_URL;

const shortenUrl = async (req, res) => {
    let { originalUrl, unique_name } = req.body;
    if(originalUrl.indexOf('http') === -1) originalUrl = 'https://' + originalUrl; 
    let nameExists = await Url.findOne({ unique_name });
    if(!validUrl.isUri(originalUrl)) {
        return res.json({
            msg : 'enter valid link',
            ok: false
        });
    }
    else if(nameExists){
        return res.json({
           msg: "unique name already exists, choose another",
           ok : false
        }) 
    }
    else {
        const shortUrl = baseUrl + '/' + unique_name;
        url = new Url({
          originalUrl,
          shortUrl,
          unique_name
        });
        url.save();
        return res.json({
            msg : 'success',
            ok : true,
            newUrl : `${process.env.BASE_URL}/${url.unique_name}`
        });
    }
}

const openUrl = async (req, res) => {
    const { unique_name } = req.params;
    try{
      let url = await Url.findOne({ unique_name });
        if(url){
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No url found');
        }  
    } catch(err) {
        console.log(err);
        res.status(500).json('Server error');
    } 
}


module.exports = {
    shortenUrl, openUrl
}