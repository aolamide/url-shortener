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
    //Prevent user from entering my domain, this causes multiple redirects
    if(originalUrl.indexOf(baseUrl) !== -1) return res.json({ok : false, msg : 'Link not allowed'});

    //Allow only certain chars in unique_name
    let valid = /^[A-Za-z0-9-_]+$/.test(unique_name);
    if(!valid) return res.json({ok : false, msg : "Only 'A-Z', 'a-z', '0-9', '-' and '_' characters are allowed in the unique name"});

    if(originalUrl.indexOf('http') === -1) originalUrl = 'https://' + originalUrl; 
    let nameExists = await Url.findOne({ unique_name });
    if(!validUrl.isUri(originalUrl)) {
        return res.json({
            msg : 'Enter valid link',
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

const getAll = async (req, res) => {
    let password = req.query.pass;
    if(password !== process.env.STAT_PASSWORD) return res.json({error : 'Incorrect password'});
    const links = await Url.find().sort('-count');
    return res.json(links);
};

module.exports = {
    shortenUrl, openUrl, getAll
};