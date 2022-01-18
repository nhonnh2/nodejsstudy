const Course = require('../model/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class Mecontroller {
    storedCourses(req, res, next) {
        Course.find().then((courses) => {
            res.render('me/stored-course', {
                title: 'khoa hoc cua toi',
                courses: mutipleMongooseToObject(courses),
            });
        });
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