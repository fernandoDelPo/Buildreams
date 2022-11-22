const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const cookie = require('cookie-parser');
const session = require("express-session");
const crypto = require('crypto');

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
		res.render('register')

	},

	store: (req, res) => {

		const resultValidation = validationResult(req);

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
		res.render('login');
	},
	authenticate: (req, res) => {
		const {
			email,
			password
		} = req.body;
		let user = users.find(user => user.email == email)

		if (user) {
			if (bcrypt.compareSync(password, user.password)) {
				// delete user.password;

				req.session.user = user;

				if (req.body.remember) {

					const token = crypto.randomBytes(64).toString('base64');
					user.token = token

					let userLoginInfo = [...usersLoginInfo, user]
					fs.writeFileSync(userLoginInfoFilePath, JSON.stringify(userLoginInfo, null, ' '));

					res.cookie('rememberToken', token, {
						maxAge: 1000 * 60 * 60 * 24 * 90
					});
				}
				req.session.userLogged = user;

				return res.redirect('/users/profile');
			} else {

				return res.render('login', {
					old: req.body,
					errors: {
						email: 'El email o la contraseña son inválidos'
					}
				});
			}
		} else {

			return res.render('login', {
				old: req.body,
				errors: {
					email: 'El email o la contraseña son inválidos'
				}
			});
		}
	},

	profile: (req, res) => {
		return res.render('userProfile', {
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

	logout: (req, res) => {
		const token = usersLoginInfo.find(user => user.token = req.cookies.rememberToken);
		if (token) {
			let logerDeleter = usersLoginInfo.filter(user => user.token != req.cookies.rememberToken);
			fs.writeFileSync(userLoginInfoFilePath, JSON.stringify(logerDeleter, null, ' '));
		}
		// Destruimos la sesión
		req.session.destroy();

		// Destruimos la cookie de recordar
		res.clearCookie('rememberToken');

		// Redirigimos a la home
		res.redirect('/');
	}

}

module.exports = userController;