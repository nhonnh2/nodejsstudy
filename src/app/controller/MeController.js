const Course = require('../model/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class Mecontroller {
    storedCourses(req, res, next) {



        //2 thao tác bất đồng bộ xảy ra cùng lúc nên ta dùng promise.all
        Promise.all([Course.countDocumentsDeleted(), Course.find({}).sortable(req)])
            .then(([deleteCount, courses]) => {
                res.render('me/stored-course', {
                    title: 'khoa hoc cua toi',
                    courses: mutipleMongooseToObject(courses),
                    deleteCount
                });
            })

        // Course.countDocumentsDeleted().then((count) => console.log(count))
        // Course.find().then((courses) => {
        //     res.render('me/stored-course', {
        //         title: 'khoa hoc cua toi',
        //         courses: mutipleMongooseToObject(courses),
        //     });
        // });
    }
    trashCourses(req, res, next) {
        Course.findDeleted().then((courses) => {
            res.render('me/trash-course', {
                title: 'khóa học đã xóa',
                courses: mutipleMongooseToObject(courses),
            });
        });
    }
}
module.exports = new Mecontroller();