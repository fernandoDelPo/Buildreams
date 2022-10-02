const path = require('path');

const mainController = {
   home:(req,res) => {
    res.render('index', {})
   },
   register:(req,res) => {
    res.render('register',{})
   },
   login:(req,res) => {
    res.render('login',{})
   },
   productCart:(req,res) => {
    res.render('productCart',{})
   },
   productDetail:(req,res) => {
    res.render('productDetail',{})
   },
}      

module.exports = mainController;