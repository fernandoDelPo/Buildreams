
const {
   validationResult
} = require('express-validator');

const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

   productCart: (req, res) => {
      res.render('productCart', {})
   },


   /*  Mostar todos los productos*/

   // listAll: async (req, res) => {
   //    try {
   //       await db.Products.findAll()
   //          .then(products => {
   //             res.render('productsList', {
   //                products,
   //                toThousand
   //             })
   //          })
   //    } catch (error) {
   //       res.send(error);
   //    }
   // },

   listAll: async (req, res) => {

		try {
			
			const products = await db.Products.findAll({
				include: [{association:'category'}]
			})
         const category = await db.Category.findAll({
				include: [{association:'products'}]
			})
		

			return res.render('productsList',{ products,toThousand, category })
		} catch (error) {
			return res.send(error)
			
		}
   },



   /* Detalle - Detalle de un producto*/

   productDetail: async (req, res) => {
      try {
         await db.Products.findByPk(req.params.id)
            .then((product) => {
               res.render('productDetail', {
                  product,
                  toThousand
               })
            })
      } catch (error) {
         res.send(error);
      }
   },


   //-----------Get y post para crear producto------//


   /* Create - Formulario para crear*/

   create: (req, res) => {
      res.render('create-product-form')
      console.log(req.cookies.color);
   },



   /* Create -  Método para almacenar */

   store: (req, res) => {

      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
         console.log(resultValidation.errors)
         return res.render('create-product-form', {
            errors: resultValidation.mapped(),
            oldData: req.body
         });
      }

      db.Products.findOne({

            where: {
               nombre: req.body.nombre
            }

         })
         .then((productdDB) => {
            if (productdDB) {
               return res.render('create-product-form', {
                  errors: {
                     nombre: {
                        msg: "Este producto ya está registrado",
                     },
                  },
                  oldData: req.body,
               });
            } else {
               let imagenNew
               if (req.file != undefined) {
                  imagenNew = req.file.filename
               } else {
                  imagenNew = 'default-image.png'
               }


               db.Products.create({
                     nombre: req.body.nombre,
                     marca: req.body.marca,
                     descripcion: req.body.descripcion,
                     precio: req.body.precio,
                     stock: req.body.stock,
                     color: req.body.color,
                     categoria_id: req.body.categoria_id,
                     imagen: imagenNew,
                     descuento: req.body.descuento,
                     enOferta: req.body.descuento > 0 ? 1 : 0,

                  })
                  .then(() => {
                     return res.redirect('/')
                  })
                  .catch((error) => {
                     console.log(error);
                  });
            }
         })
   },



   //-----------Get y post para editar producto------//
   // Get -- traer vista--------------------------------//
   edit: async (req, res) => {

      try {

         let Id = req.params.id;
         let productToEdit = await db.Products.findByPk(Id, {
            include: {
               all: true
            }
         })

         res.render('editProduct', {
            productToEdit
         })

      } catch (error) {
         res.send(error)
      }

   },
   

   //Post ----------------------------------//

   update: async (req, res) => {
      try {

         const resultValidation = validationResult(req);

         let productToEdit = db.Products.findByPk(req.params.id);
         if (resultValidation.errors.length > 0) {
            return res.render("editProduct", {
               productToEdit,
               errors: resultValidation.mapped(),
               oldData: req.body,
            });
         }


         console.log(req.body)

         let oferta = req.body.descuento > 0 ? 1 : 0 

         await db.Products.update({
            nombre: req.body.nombre || productToEdit.nombre,
            descripcion: req.body.descripcion || productToEdit.descripcion,
            marca: req.body.marca || productToEdit.marca,
            precio: req.body.precio || productToEdit.precio,
            stock: req.body.stock || productToEdit.stock,
            categoria_id: req.body.categoria_id || productToEdit.categoria_id,
            color: req.body.color || productToEdit.color,
            descuento: req.body.descuento || productToEdit.descuento,
            enOferta: oferta,
            imagen: req.file == undefined ? productToEdit.imagen : req.file.filename,
         }, {
            where: {
               id: req.params.id,
            },
         });
         return res.redirect("/products/productDetail/" + req.params.id);
      } catch (error) {
         res.send(error)
      }

   },


   // Eliminar un producto-------------------------------//

   destroy: async (req, res) => {


      console.log('1')

      try {

         let IdD = req.params.id;
         await db.Products.destroy({
            where: {
               id: IdD
            },
            force: true
         })
         return res.redirect('/')

      } catch (error) {
         res.send(error)
      }

   }
}
module.exports = controller;