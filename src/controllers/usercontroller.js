const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')

const userFilePath = path.join(__dirname, '../data/userDB.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userLoginInfoFilePath = path.join(__dirname, '../data/userLoginInfo.json');
const usersLoginInfo = JSON.parse(fs.readFileSync(userLoginInfoFilePath, 'utf-8'));

const {
	validationResult
} = require('express-validator');

// const User = require('../models/User');

const userController = {
	register: (req, res) => {
		console.log('estas por get')
		res.render('register')

	},

	store: (req, res) => {

		console.log('estas por post')

		const resultValidation = validationResult(req);
		console.log('estas por post')
		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		users.forEach(user => {
			if (user.email === req.body.email) {
				return res.render('register', {
					errors: {
						email: {
							msg: 'Este email ya está registrado'
						}
					},
					oldData: req.body
				});
				console.log()
			}
		});



		let newUser = {
			id: users[users.length - 1].id + 1,
			...req.body,
			image: req.file ? req.file.filename : 'default.png',
			category: 'user'
		};

		//encriptamos la contrasenia y borramos el password para q noo se guarde en nuestro json
		newUser.password = bcrypt.hashSync(req.body.password, 10);
		delete newUser.repassword


		//escribimos en nuestro archivo json
		let usersNews = [...users, newUser]
		fs.writeFileSync(userFilePath, JSON.stringify(usersNews, null, ' '));

		return res.redirect('./users/login');

	},

	login: (req, res) => {
		return res.render('login');
	},

	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);

		if (userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if (req.body.remember_user) {
					res.cookie('userEmail', req.body.email, {
						maxAge: (1000 * 60) * 60
					})
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

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},



	profile: (req, res) => {
		return res.render('profile', {
			user: req.session.userLogged
		});
	},

	editProfile: (req, res) => {
		let id = req.params.id
		let UserEdit = users.find(user => user.id == id)
		res.render('profile', {
			UserEdit
		})
	},

	UpdateProfile: (req, res) => {
		let id = req.params.id;
		let UserEdit = users.find(user => user.id == id);

		let imagen
		if (req.file != undefined) {
			imagen = req.file.image - profile
		} else {
			imagen = 'default.png'
		}

		UserEdit = {
			id: UserEdit.id,
			...req.body,
			imagen: imagen,
		}

		let newUser = users.map(user => {

			if (user.id == UserEdit.id) {

				return user = {
					...UserEdit
				};

			}

			return user;
		})

		console.log(newUser)

		fs.writeFileSync(userFilePath, JSON.stringify(newUser, null, ' '));
		res.redirect('/');
	},

	logout: (req, res) => {},

	authenticate: (req, res) => {

	},


}
module.exports = userController;