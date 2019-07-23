const { urlModel : Url } = require('../models/url');
const validUrl = require('valid-url');
const path = require('path');


const baseUrl = 'http://localhost:3000';

const shortenUrl = async (req, res) => {
    const { originalUrl, unique_name } = req.body;
    let nameExists = await Url.findOne({ unique_name });
    if(!validUrl.isWebUri(originalUrl)) {
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
            newUrl : `http://localhost:3000/${url.unique_name}`
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

const renderHtml = (req, res) => {
    const html = path.join(__dirname, '/../public/index.html');
    return res.sendFile(html);
};

module.exports = {
    shortenUrl, openUrl, renderHtml
}