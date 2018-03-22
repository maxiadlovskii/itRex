var router = require('express').Router();
var mocks = require('./mock');
var assign = require('object-assign');




router.get('/grades', function (req, res, next) {
    var grades = mocks.grades.map(function (grade) {
            return assign({}, grade, {
                text: undefined
            })
        }),
        limit = Number(req.query.limit) || grades.length,
        offset = Number(req.query.offset) || 0;

    res.json(grades.slice(offset, limit + offset))
});

router.get('/grades/:id', function (req, res, next) {
    var grades = mocks.grades.filter(function (grade) {
        return grade.id == req.params.id
    })[0];
    if (grades) return res.json(grades);

    res.status(404).json({error: "not found"});
});

router.get('/students', function (req, res, next) {
    var aid = req.query.grades;
    if (aid) {
        var grades = mocks.grades.find(function(grade) {
            return grade.id == aid
        })
        return res.json((grades.students || []).map(function(id) {
            return mocks.students.find(function(student) {
                return student.id == id
            })
        }))
    }

    var limit = Number(req.query.limit) || mocks.students.length,
        offset = Number(req.query.offset) || 0;
    res.json({
        total: mocks.students.length,
        records: mocks.students.slice(offset, limit + offset)
    })
});
/*
router.post('/grades', function (req, res, next) {
    var body = req.body;
    var grade = {

        id: Date.now().toString(),
        title: body.title,
        students: body.students
    };
    mocks.grades.push(grade);
    res.json(grade)
});


router.post('/students', function (req, res, next) {
    var comment = {
        id : Date.now().toString(),
        name : req.body.name,
        gpa : req.body.gpa
    };
    mocks.students.push(comment);
    res.json(comment)
});
*/

module.exports = router;
