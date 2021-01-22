const express = require('express');
const Router = express.Router();

Router.get('/home',(req,res)=>{
    res.render('home.ejs')
    res.end();
})

Router.get('/register',(req,res)=>{
    res.render('register.ejs');
    res.end();
});

module.exports = Router