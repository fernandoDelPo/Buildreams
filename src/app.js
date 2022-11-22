const express = require('express');
const session = require('express-session');
const path = require('path');
const methodOverride= require('method-override');
const cookies = require('cookie-parser');
const auth = require('./middlewares/auth');

const app = express();

app.use(express.static(path.resolve(__dirname, "../public")))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());
app.use(methodOverride('_method'))
app.use(auth);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const mainRouter = require('./router/mainRouter');
const productsRouter = require('./router/productsRouter');
const userRouter = require('./router/userRouter');

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', userRouter);



app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(3030, () => {
    console.log('Corriendo en puerto 3030');
});

module.exports = app;

