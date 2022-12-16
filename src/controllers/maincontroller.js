
const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
   // home: (req, res) => {
   //       db.Products.findAll()
   //          .then(products => {
   //             res.render('index', {
   //                products,
   //                toThousand
   //             })
   //          })
   //    }
   // },

   home: async (req, res) => {

		try {
			
			const products = await db.Products.findAll({
				include: [{association:'category'}]
			})
         const category = await db.Category.findAll({
				include: [{association:'products'}]
			})
		

			return res.render('index',{ products,toThousand, category })
		} catch (error) {
			return res.send(error)
			
		}
   },

}
module.exports = mainController;