const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db/index');
const methodOverride = require('method-override');
const sortMiddleware = require("./app/middlewares/sortMiddleware")
const helpers = require('./helpers/handlebars');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

console.log(db.connect());

//HTTP logger
app.use(morgan('combined'));

//custom middleware sort
app.use(sortMiddleware);
//midleware body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers

    })
);
app.set('view engine', 'hbs');
//set folder view
app.set('views', path.join(__dirname, 'resources', 'views'));
//init route
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});