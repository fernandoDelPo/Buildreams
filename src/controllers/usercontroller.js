
const bcrypt = require('bcryptjs');
const cookie = require('cookie-parser');
const session = require("express-session");
const crypto = require('crypto');


const {
	validationResult
} = require('express-validator');

const db = require('../database/models');

const userController = {
	list: (req, res) => {
		db.Users.findAll()
			.then(users => {
				res.render('userList.ejs', {
					users
				})
			})
	},


	register: (req, res) => {
		res.render('register')

	},

	store: async (req, res) => {
		try{
			const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		await db.Users.findOne({

				where: {
					email: req.body.email
				}

			})
			.then((userDB) => {
				if (userDB) {
					return res.render('register', {
						errors: {
							email: {
								msg: "Este email ya está registrado",
							},
						},
						oldData: req.body,
					});

				} else if (req.body.password != req.body.rePassword) {
					return res.render('register', {
						errors: {
							password: {
								msg: "Las contraseñas no coinciden",
							}
						},
						oldData: req.body,
					})
				} else {
					db.Users.create({
							nombre: req.body.nombre,
							nick: req.body.nick,
							country: req.body.country,
							email: req.body.email,
							password: bcrypt.hashSync(req.body.password, 10),
							category: 'user',
							image: req.file ?.filename || "default.png",
						})
						.then(() => {
							return res.redirect("./users/login");
						})
						.catch((error) => {
							console.log(error);
						});
				}

			});

		} catch (error) {
			res.send(error)
		}
	
	},


	login: (req, res) => {
		res.render('login');
	},

	authenticate: (req, res) => {

		const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('login', {
				errors: resultValidation.mapped(),
				oldData: req.body,
			});
		}
		db.Users.findOne({
				where: {
					email: req.body.email
				}
			})
			.then((userLogin) => {
				if (userLogin) {
					let passwordOk = bcrypt.compareSync(
						req.body.password,
						userLogin.password
					);
					if (passwordOk) {
						delete userLogin.password;
						req.session.userLogged = userLogin;

						if (req.body.remember) {
							res.cookie("remember", req.body.email, {
								maxAge: 1000000
							});
						}

						return res.redirect('/users/profile');
					}

					return res.render('login', {
						errors: {
							email: {
								msg: 'El email o la contraseña son inválidos',
							},
						},
					});
				}

				return res.render('login', {
					errors: {
						email: {
							msg: 'El email o la contraseña son inválidos',
						},
					},
				});
			})
			.catch((error) => {
				res.send(error);
			});

	},



	profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},

	editProfile: (req, res) => {
		db.Users.findByPk(req.params.id)
			.then(function (userToEdit) {
				res.render('editProfile', {
					userToEdit: userToEdit
				});
			})
			.catch((error) => {
				res.send(error);
			});
	},

	
	UpdateProfile: (req, res) => {
		const resultValidation = validationResult(req);
		let userToEdit = db.Users.findByPk(req.params.id)
		if (resultValidation.errors.length > 0) {
			return res.render('editProfile', {
				errors: resultValidation.mapped(),
				oldData: req.body,
				userToEdit
			});
		}
		console.log(req.body);
		 db.Users.findByPk(req.params.id).then((userEdit) => {
			db.Users.update({
					nombre: req.body.nombre || userEdit.nombre,
					nick: req.body.nick || userEdit.nick,
					country: req.body.country || userEdit.country,
					email: req.body.email || userEdit.email,
					password: userEdit.password,
					image: req.file == undefined ? userEdit.image : req.file.filename,
				}, {
					where: {
						id: req.params.id
					},
				})
				.then(() => {
					return res.redirect('/users/profile');
				})
				.catch((error) => res.send(error));
		});

	
	},

	editProfile2: (req, res) => {
		db.Users.findByPk(req.params.id)
			.then(function (userToEdit) {
				res.render('editProfilePassword', {
					userToEdit: userToEdit
				});
			})
			.catch((error) => {
				res.send(error);
			});
	},

	UpdatePassword: (req, res) => {
		db.Users.findByPk(req.params.id).then((userEdit) => {
			if (req.body.password != req.body.rePassword) {
				console.log(req.body.password)
				return res.render('editProfilePassword', {
					errors: {
						password: {
							msg: "Las contraseñas no coinciden",
						}
					},
					oldData: req.body,
				})
			} else {
				db.Users.update({
						nombre: userEdit.nombre,
						nick: userEdit.nick,
						country: userEdit.country,
						email: userEdit.email,
						password: req.body.password == "" ? userEdit.password : bcrypt.hashSync(req.body.password, 10),
						category: userEdit.category,
						image: userEdit.image
					}, {
						where: {
							id: req.params.id
						},
					})
					.then(() => {
						return res.redirect('/users/profile');
					})
					.catch((error) => {
						console.log(error);
					});
			}
		});

	},


	logout: (req, res) => {
		res.clearCookie("remember");
		req.session.destroy();
		return res.redirect("/");
	},

	delete: function (req, res) {
		db.Users.destroy({
		  where: { 
			id: req.params.id 
		}
		}) 
		  .then(() => {
			req.session.destroy();
			res.clearCookie("remember");
			
			return res.redirect("/");
		  })
		  .catch((error) => res.send(error));
	  },

}

module.exports = userController;