const { urlModel : Url } = require('../models/url');
const validUrl = require('valid-url');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


const baseUrl = process.env.BASE_URL;

const shortenUrl = async (req, res) => {
    let { originalUrl, unique_name } = req.body;
    unique_name = unique_name.trim();
    if(!unique_name) {
        return res.json({msg : 'Enter valid unique name', ok : false});
    }
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
            url.count = url.count + 1;
            url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.sendFile(path.join(__dirname, '../public/404.html'));
        }  
    } catch(err) {
        res.status(500).json('SERVER ERROR');
    } 
}

module.exports = {
    shortenUrl, openUrl
}