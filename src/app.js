const express = require('express');
const path = require('path');
const app = express();
const main = require('./router/main');

app.use(express.static(path.resolve(__dirname, "../public")))
app.use('/', main);

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.listen(3030, () => {
    console.log('Corriendo en puerto 3030');
});

