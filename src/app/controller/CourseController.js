const Course = require('../model/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    //GET / courses
    // index(req, res) {
    //         res.render('courses');
    //     }
    //[GET] /courses /:slug (get course detail)
    show(req, res, next) {
            const slug = req.params.slug;
            Course.findOne({ slug: slug })
                .then((course) => {
                    res.render('courses/show', {
                        title: 'course detail',
                        course: mongooseToObject(course),
                    });
                })
                .catch(next);
        }
        //[get] / courses / create
    create(req, res, next) {
            res.render('courses/create', { title: 'thêm khóa học' });
        }
        //[get] /course / :id /edit
    edit(req, res, next) {
            Course.findOne({ _id: req.params.id })
                .then((course) => {
                    res.render('courses/edit', {
                        title: 'sửa khóa học',
                        course: mongooseToObject(course),
                    });
                })
                .catch(next);
        }
        //[put] / course/:id
    update(req, res, next) {
            Course.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('/me/stored/courses'))
                //redirect để thêm một field là location trong res header để trình duyệt đi tới location này
                .catch(next);
        }
        //delete / course/:id
    delete(req, res, next) {
            Course.delete({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        }
        //delete / course/:id/force
    deleteForce(req, res, next) {
            Course.deleteOne({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
        }
        //[patch]/ course/:id/restore
    restore(req, res, next) {
            Course.restore({ _id: req.params.id })
                .then(() => res.redirect("back"))
                .catch(next);
        }
        //[post] / courses / store
    store(req, res, next) {
            let formData = req.body;
            formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCgtOUysU9o_51ESB67zmK63tNULw`;

            var course = new Course(formData);
            course
                .save()
                .then(() => res.redirect(`/`))
                .catch((err) => {
                    console.log('err create course', err);
                });
        }
        //[post]/courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'action is invalid!' });
        }
    }

    async getAllCourses(req, res) {
        try {
            const data = courses.find({});
            return res.status(200).json({
                message: 'ok',
                data
            })
        } catch (err) {
            return res.status(500).json({ message: "error server" })
        }
    }
}
module.exports = new CourseController();