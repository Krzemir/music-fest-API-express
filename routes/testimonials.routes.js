const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4} = require('uuid')


router.route('/testimonials').get((req, res ) => {
    db.testimonials.length > 0 ? 
    (res.json(db.testimonials)) : 
    (res.json({message: 'There are no testimonials'}))
})

router.route('/testimonials/random').get((req, res ) => {
    if (db.testimonials.length > 0){ 
        res.json(db.testimonials.find(e => e.id == Math.floor(Math.random() * db.testimonials.length+1)))
    } else {
        res.status(404).json({message: 'There are no testimonials'}); 
    }
})

router.route('/testimonials/:id').get((req, res) => {
    testimonialId = (db.testimonials.find(e => e.id == req.params.id));
    if (testimonialId) {
        res.json(db.testimonials.find(e => e.id == req.params.id))
    } else 
    {
        res.status(404).json({message: 'There is no such testimonial'}); 
    }
})

router.route('/testimonials').post((req, res) => {
    id = uuidv4();
    const { author, text } = req.body;
    if (author && text) {
        db.testimonials.push({id, author, text, });
    res.json({message: 'OK'});
    console.log(db.testimonials);
    }
    else {
        res.status(400).json({message: 'Please add all needed data'});
    }
})

router.route('/testimonials/:id').put((req, res ) => {
    const { author, text } = req.body;
    const testimonialIndex = (db.testimonials.findIndex(e => e.id == req.params.id));
    if (testimonialIndex != -1) {
    if (author || text) {
        db.testimonials[testimonialIndex] = {...db.testimonials[testimonialIndex], ...req.body}
         res.json({message: 'OK'});
    console.log(db.testimonials);
    } else {
        res.status(400).json({message: 'Please change author or text'})
    }
    } else {
    (res.status(404).json({message: 'There is no such testimonial'}))
    }
})

router.route('/testimonials/:id').delete((req, res) => {
    const testimonialIndex = (db.testimonials.findIndex(e => e.id == req.params.id));

    if (testimonialIndex != -1) {
        db.testimonials.splice(testimonialIndex, 1)
    res.json({message: 'OK'});
    } else {
        res.json({message: 'There is no such testimonial'});
    }
    console.log(db.testimonials)
})


module.exports = router