const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(3030, () => {
    console.log('Corriendo en puerto 3030');
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/register.html'));
});

app.post("/register", (req, res) => {
    console.log(req.body);
    res.sendFile(path.resolve(__dirname, './src/views/home.html')); /*res.send("Te registraste exitosamente")*/
})

app.get('/login', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './src/views/login.html'))
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.sendFile(path.resolve(__dirname, './src/views/home.html'));
});

app.get('/productCart', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './src/views/productCart.html'))
});

app.post('/productCart', (req, res) => {
    console.log(req.body);
    res.sendFile(path.resolve(__dirname, './src/views/productCart.html'));
});

app.get('/productDetail', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './src/views/productDetail.html'))
});

app.post('/productDetail', (req, res) => {
    console.log(req.body);
    res.sendFile(path.resolve(__dirname, './src/views/productDetail.html'));
});