const express = require('express');
const path = require('path');
const app = express();
const methodOverride= require('method-override');
const mainRouter = require('./router/mainRouter');
const productsRouter = require('./router/productsRouter');
const userRouter = require('./router/userRouter');
const {check} = require('express-validator');



app.use(methodOverride('_method'))
app.use(express.static(path.resolve(__dirname, "../public")))

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', userRouter);


app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
}),

app.use((req, res, next) => {
    res.status(404).render('not-found');
   })
   

app.listen(3030, () => {
    console.log('Corriendo en puerto 3030');
});

module.exports = app;

