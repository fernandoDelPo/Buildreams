const path = require('path');

let productos = [
   {
      id: 1,
      nombre: "PLASTICOR 40KG",
      descripcion: "Marca Loma Negra",
      precio: "1194.02",
      imagen: "plasticor-loma-negra-40kg.jpg",
      stock: "150",
      enOferta: false,
   },
   {
      id: 2,
      nombre: "CAL CACIQUE MAX 30KG",
      descripcion: "Marca Cacique",
      precio: "949.50",
      imagen: "cal-cacique-max-30kg.jpg",
      stock: "100",
      enOferta: false,
   },
   {
      id: 3,
      nombre: "LADRILLO HUECO 8X18X33 6AG",
      descripcion: "Marca Buildreams",
      precio: "104.30",
      imagen: "ladrillo-hueco.jpg",
      stock: "1500",
      enOferta: false,
   },
   {
      id: 4,
      nombre: "BARRA HIERRO aletado ø10mm x 12m",
      descripcion: "Techint",
      precio: "2300",
      imagen: "Barra-Hierro-10x12.jpg",
      stock: "2300",
      enOferta: false,
   },
   {
      id: 5,
      nombre: "HIDROFUGO 20GK",
      descripcion: "Marca Sineplast",
      precio: "3500",
      imagen: "hidrofugo.jpg",
      stock: "345",
      enOferta: true,
   },
   {
      id: 6,
      nombre: "REVOQUE 2 EN 1 PROYECTABLE 3OKG",
      descripcion: "Marca Weber",
      precio: "2760",
      imagen: "Revoque2-en-1.jpg",
      stock: "546",
      enOferta: true,
   },
   {
      id: 7,
      nombre: "YEMACO 40KG",
      descripcion: "Marca Durlock Yeso Tradicional",
      precio: "4160",
      imagen: "yeso.jpg",
      stock: "546",
      enOferta: true,
   },
   {
      id: 8,
      nombre: "PASTINA LISTA GRIS PERLA 1KG",
      descripcion: "Marca Weber",
      precio: "1800",
      imagen: "pastina.jpg",
      stock: "123",
      enOferta: true,
   }
]
const mainController = {
   home: (req, res) => {
      res.render('index', { productos });
   },
   register: (req, res) => {
      res.render('register', {})
   },
   login: (req, res) => {
      res.render('login', {})
   },
   productCart: (req, res) => {
      res.render('productCart', {})
   },
   productDetail: (req, res) => {
      let idproducto = req.params.id;
      let producto = productos.find(producto => producto.id == idproducto);
      res.render('productDetail', { productos });
   },
}

module.exports = mainController;