const express = require('express');
const router = express.Router();

//Require middleware
const { checkAuth, validateTurf, isAuthor } = require('../middleware.js');

//Require utils
const catchAsync = require('../utils/catchAsync.js');

//Requiring controllers
const turfs = require('../controllers/turfs.js');

const multer = require('multer');
const { storage } = require('../cloudinary/index.js');
const upload = multer({ storage })

//Routes
router.get('/', catchAsync(turfs.getAllTurfs));

// router.post('/new', checkAuth, validateTurf, catchAsync(turfs.addTurf));
router.post('/new', upload.array('image'), (req, res) => {
    console.log(req.body);
    console.log(req.files);
});

router.get('/:id', catchAsync(turfs.getTurf));

router.patch('/:id', checkAuth, isAuthor, validateTurf, catchAsync(turfs.updateTurf));

router.delete('/:id', isAuthor, catchAsync(turfs.deleteTurf));


module.exports = router;