const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./router/mainRouter');
const productsRouter = require('./router/productsRouter');
const userRouter = require('./router/userRouter');

app.use(express.static(path.resolve(__dirname, "../public")))

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', userRouter);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.listen(3030, () => {
    console.log('Corriendo en puerto 3030');
});

