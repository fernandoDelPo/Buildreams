const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/userDB.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));


const userController = {
    register: (req, res) => {
        res.render('register', {})
    },
    login: (req, res) => {
        res.render('login', {})
    },
    profile: (req, res) => {
		res.render('profile')
    },
    
    store:  (req, res) => {
	},

    logout: (req,res) => {
	},

    authenticate:(req, res)=>{

    } 
}
module.exports = userController;