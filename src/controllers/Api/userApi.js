const fs = require("fs");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../../database/models");

const userApi = {
  allUsers: (req, res) => {
    db.Users.findAll({
      attributes: ["id", "nombre", "nick", "email", "country", "category"],
    })
      .then((users) => {
        for (let i = 0; i < users.length; i++) {
          users[i].setDataValue(
            "detail",
            `http://localhost:3030/api/users/profile/${users[i].id}`
          );
        }

        var countAdmin = 0;

        
        users.forEach(user => {
          if(user.category == 'admin'){
            countAdmin += 1;
          }
        });
        

        let response = {
          count: users.length -1,
          admin: countAdmin,
          data: users,
          status: 200,
        };
       

        res.status(200).json(response);
      })
      .catch((error) => res.json(error));
  },

  profile: (req, res) => {
    db.Users.findByPk(parseInt(req.params.id, 10))
      .then((user) => {
        let response = {
          id: user.id,
          nombre: user.nombre,
          nick: user.nick,
          email: user.email,
          country: user.country,
          image: `http://localhost:3030/images/avatars/${user.image}`,
        };
        res.status(200).json(response);
      })
      .catch((error) => console.error(error));
  },
};
module.exports = userApi;
