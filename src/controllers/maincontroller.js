const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const mainController = {
   home: (req, res) => {

      res.render('index', {
         products
      });

      // try{
      //    const products = db.Product.findAll()
      //    return res.render('index', {products})

      // } catch(error){
      //    res.send(error)
      // }
   },

}

module.exports = mainController;