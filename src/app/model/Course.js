const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var slug = require('mongoose-slug-generator');


const Course = new Schema({
    name: { type: String, maxLength: 255, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255 },
    level: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },
}, { timestamps: true });

//custom query helpers
Course.query.sortable = function(req) {
    //hasOwnProperty check key có tồn tại trong object k
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc'
        })
    }
    return this;
}

//add plugin
mongoose.plugin(slug);
Course.plugin(mongoose_delete, { overrideMethods: "all", deletedAt: true });
//timestamps:true tự tạo createAt và updateAt
module.exports = mongoose.model('Course', Course);
//nếu collection chưa có ở trong database nó sẽ tự tạo collection mới