const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/userDB.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userLoginInfoFilePath = path.join(__dirname, '../data/userLoginInfo.json');
const usersLoginInfo = JSON.parse(fs.readFileSync(userLoginInfoFilePath, 'utf-8'));

const userController = {
    register: (req, res) => {
        res.render('register', {})
    },
    login: (req, res) => {
        res.render('login', {})
    },
    editProfile: (req, res) => {
        let id = req.params.id
		let UserEdit = users.find(user => user.id == id)
		res.render('profile', { UserEdit })
    },
    UpdateProfile: (req, res) => {
        let id = req.params.id;
        let UserEdit = users.find(user => user.id == id);
        
        let imagen
        if(req.file != undefined){
          imagen = req.file.image-profile
        } else {
          imagen = 'default.png'
        }

        UserEdit ={
            id: UserEdit.id,
			...req.body,
			imagen: imagen,
        }

        let newUser = users.map(user => {
			
			if (user.id == UserEdit.id) {
				
				return user = { ...UserEdit };
				
			}
			
			return user;
		})

		console.log(newUser)

		fs.writeFileSync(userFilePath, JSON.stringify(newUser, null, ' '));
		res.redirect('/');
    },
    store:  (req, res) => {
        
	},

    logout: (req,res) => {
	},

    authenticate:(req, res)=>{

    } 
}
module.exports = userController;