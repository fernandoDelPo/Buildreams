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

const db = require('../database/models');

const userController = {
	'list': (req, res) => {
        db.Users.findAll()
            .then(users => {
                res.render('userList.ejs', {users})
            })
    },




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
		let userToEdit = users.find(user => user.id == id)
		res.render('editProfile', {
			userToEdit
		})
	},

	UpdateProfile: (req, res) => {
		console.log(req.params.id)
		console.log(req.body)
		let id = req.params.id;
		let userToEdit = users.find(user => user.id == id);
		console.log(userToEdit)

		userToEdit = {
			id: userToEdit.id,
			nombre: req.body.nombre,
			nick: req.body.nick,
			email: userToEdit.email,
			country: req.body.country,
			image: userToEdit.image,
			password: userToEdit.password,
			category: userToEdit.category,
		}
		console.log(userToEdit)

		let newUser = users.map(user => {

			if (user.id == userToEdit.id) {

				return user = {
					id: userToEdit.id,
					nombre: userToEdit.nombre,
					nick: userToEdit.nick,
					email: userToEdit.email,
					country: userToEdit.country,
					image: userToEdit.image,
					password: userToEdit.password,
					category: userToEdit.category,

				};

			}

			return user;

		})
		console.log('Este es el nuevo usuario  ' + newUser)

		fs.writeFileSync(userFilePath, JSON.stringify(newUser, null, ' '));
		res.redirect('/users/profile');
	},

	// UpdateProfile: (req, res) => {
	// 	console.log(req.params.id)
	// 	let id = req.params.id;
	// 	let userToEdit = users.find(user => user.id == id);
	// 	console.log(userToEdit)
	// 	console.log(req.file.filename)

	// 	let image
	// 	if (req.file != undefined) {
	// 		image = req.file.filename
	// 	} else {
	// 		image = userToEdit.image
	// 	}

	// 	userToEdit = {
	// 		id: userToEdit.id,
	// 		...req.body,
	// 		image: image,
	// 	}
	// 	console.log(userToEdit)

	// 	let newUser = users.map(user => {

	// 		if (user.id == userToEdit.id) {

	// 			return user = {
	// 				...userToEdit
	// 			};

	// 		}

	// 		return user;
	// 		console.log(user)
	// 	})


	// 	fs.writeFileSync(userFilePath, JSON.stringify(newUser, null, ' '));
	// 	res.redirect('/userProfile');
	// },

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