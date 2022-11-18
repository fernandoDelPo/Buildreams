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

    loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('userLoginForm', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},

	profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
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