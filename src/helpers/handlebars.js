const Handlebars = require("handlebars");

module.exports = {
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

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${types[sort.type]}`)
        const output = `<a href="${href}">
                            <span class="oi ${typeIcoin}" ></span>
                        </a>`
        return new Handlebars.SafeString(output);
    }
}