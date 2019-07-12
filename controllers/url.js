const { urlModel : Url } = require('../models/url');
const validUrl = require('valid-url');
const nanoId = require('nano-id');

const baseUrl = 'http://locahost:3000';

const shortenUrl = (req, res) => {
    const { originalUrl, unique_name } = req.body;
    // let nameExists = Url.findOne({ unique_name });
    // console.log(nameExists);
    // if(nameExists){
    //     res.json("unique name already exits, choose another") 
    // }
    if(!validUrl.isWebUri(originalUrl)) {
        return res.json('enter valid link');
    }
    else {
        const shortUrl = baseUrl + '/' + unique_name;

        url = new Url({
          originalUrl,
          shortUrl,
          unique_name,
          date: new Date().toLocaleDateString()
        });

        url.save();
        return res.json(url);
    }
}

const openUrl = (req, res) => {
    const { unique_name } = req.params;
    let url = Url.findOne({ unique_name });
    if(url){
        return res.redirect(url.originalUrl);
    } else {
        return res.status(404).json('No url found');
    }
}

module.exports = {
    shortenUrl, openUrl
}