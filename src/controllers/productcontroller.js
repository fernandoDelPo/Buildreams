const fs = require('fs');
const path = require('path');
const {
   validationResult
} = require('express-validator');

const db = require('../database/models');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

   productCart: (req, res) => {
      res.render('productCart', {})
   },

   /* Raíz - Mostarar todos los productos*/

   index: async(req, res) => {

      // res.render('products', {
      //    products,
      //    toThousand
      // })

      try{
         const products = db.Product.findAll()
         return res.render('product', {products, toThousand})

      } catch(error){
         res.send(error)
      }

   },

   /* Detalle - Detalle de un producto*/

   productDetail: async(req, res) => {
      let idproduct = req.params.id;
      let product = products.find(product => product.id == idproduct);
      res.render('productDetail', {
         product,
         products,
         toThousand
      });

      // try{
      //    const Id = req.params.id;
      //    const producto = await db.Products.findByPk(Id,{include: {all: true}})

      //    res.render('productDetail', {producto})
      // } catch (error){
      //    res.send(error)
      // }
   },


   //-----------Get y post para crear producto------//


   /* Create - Formulario para crear*/

   create: (req, res) => {
      res.render('create-product-form')
      console.log(req.cookies.color);
   },

   /* Create -  Método para almacenar */

   store: (req, res) => {

      // const resultValidation = validationResult(req);

      // if (resultValidation.errors.length > 0) {
      //    console.log(resultValidation.errors)
      //    return res.render('create-product-form', {
      //       errors: resultValidation.mapped(),
      //       oldData: req.body
      //    });
      // } else {

      //    let imagen
      //    if (req.file != undefined) {
      //       imagen = req.file.filename
      //    } else {
      //       imagen = 'default-image.png'
      //    }

      //    let newProduct = {
      //       id: products[products.length - 1].id + 1,
      //       ...req.body,
      //       imagen,
      //       if (enOferta = 'Sin Descuento') {
      //          enOferta = false
      //       }

      //    };
      //    console.log(req.body);

      //    let productsNews = [...products, newProduct]
      //    fs.writeFileSync(productsFilePath, JSON.stringify(productsNews, null, ' '));

      //    res.redirect('/');
      // }

      // let newProduct = {
      //    id: newProduct.id,
      //    ...req.body,
      //    imagen
      // };

      // let productsNews = products.map(product => {

      //    if (product.id == productToEdit.id) {

      //       return product = {
      //          ...productToEdit
      //       };
      //    }

      //    return product;
      // })

      // fs.writeFileSync(productsFilePath, JSON.stringify(productsNews, null, ' '));
      // res.redirect('/');

      console.log(req.body)

      let imagenNew
      if (req.file != undefined) {
         imagenNew = req.file.filename
      } else {
         imagenNew = 'default-image.png'
      }

      console.log(req.body)

      db.Products.create({
         nombre: req.body.nombre,
         marca: req.body.marca,
         descripcion: req.body.descripcion,
         precio: req.body.precio,
         stock: req.body.stock,
         color: req.body.color,
         enoferta: req.body.enOferta,
         categoria_id: req.body.categoria_id,
         imagen: imagenNew,
         descuento: req.body.descuento
      })
      .then(()=> {
         return res.redirect('/')})            
      .catch(error => res.send(error))



   },


   //-----------Get y post para editar producto------//
   // Get -- traer vista--------------------------------//
   edit: async(req, res) => {

      // let idProduct = req.params.idProduct
      // let productEdit = products.find(product => product.id == idProduct)
      // res.render('editProduct', {
      //    productEdit
      // })

      try{  

         let Id = req.params.id;
         let Producto = db.Products.findByPk(Id, {include: {all: true}})

         res.render('editProduct', {Producto}) 

      } catch(error){
         res.send(error)
      }
      
   },
   //Post ----------------------------------//
   update: (req, res) => {

      // let id = req.params.id;
      // let productToEdit = products.find(product => product.id == id)

      // let imagen
      // if (req.file != undefined) {
      //    imagen = req.file.filename
      // } else {
      //    imagen = 'default-image.png'
      // }


      // productToEdit = {
      //    id: productToEdit.id,
      //    ...req.body,
      //    imagen: imagen
      // }

      // let newProducts = products.map(product => {

      //    if (product.id == productToEdit.id) {
      //       return product = {
      //          ...productToEdit
      //       };
      //    }
      //    return product;
      // })

      // fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
      // res.redirect('/');

      let imagenNew
      if (req.file != undefined) {
         imagenNew = req.file.filename
      } else {
         imagenNew = 'default-image.png'
      }

      let IdE = req.params.id;

      db.Products.update({
         nombre: req.body.nombre,
         marca: req.body.marca,
         descripcion: req.body.descripcion,
         precio: req.body.precio,
         stock: req.body.stock,
         color: req.body.color,
         descuento: req.body.descuento,
         category_id: null,
         imagen: imagenNew
      },
      {
         where: {id: IdE}
      })
      .then(()=> {
         return res.redirect('/')})            
      .catch(error => res.send(error))

   },

   // Eliminar un producto-------------------------------//

   destroy: async(req, res) => {

      // let id = req.params.id;
      // let newProducts = products.filter(product => product.id != id)
      // fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));

      // res.redirect('/');

      console.log('1')

      try{

         let IdD = req.params.id;
         await db.Products.destroy({where: {id: IdD}, force: true})
         return res.redirect('/')

      } catch(error){
         res.send(error)
      }

   }
}
module.exports = controller;