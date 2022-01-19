const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db/index');
const methodOverride = require('method-override');
const SortMiddleware = require("./app/middlewares/SortMiddleware")

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

console.log(db.connect());

//HTTP logger
app.use(morgan('combined'));

//custom middleware sort
app.use(SortMiddleware);
//midleware body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            euqal: (a, b) => (a = b),
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : "default"
                const typesIcoin = {
                    default: "oi-elevator",
                    asc: "oi-sort-ascending",
                    desc: "oi-sort-descending",
                }
                const types = {
                    default: "desc",
                    asc: "desc",
                    desc: "asc",
                }
                const typeIcoin = typesIcoin[sortType];
                return `<a href="?_sort&column=${field}&type=${types[sort.type]}">
                <span class="oi ${typeIcoin}" ></span>
            </a>`
            }
        },

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