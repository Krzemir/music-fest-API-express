const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4} = require('uuid')


router.route('/concerts').get((req, res) => {
    db.concerts.length > 0 ? 
    (res.json(db.concerts)) :
    (res.status(404).json({message: 'There are no concerts'}))
})

router.route('/concerts/:id').get((req, res) => {
    db.concerts.find(e => e.id == req.params.id) ? 
    (res.json(db.concerts.find(e => e.id == req.params.id))) :
    (res.status(404).json({message: 'There is no such concert'}))
})


router.route('/concerts').post((req, res) => {
    const id = uuidv4();
    const { performer, genre, price, day, image } = req.body;
    if (performer && genre && price && day && image ) {
        db.concerts.push({id, performer, genre, price, day, image});
    res.json({message: 'OK'});
    console.log(db.concerts);
    }
    else {
        res.status(400).json({message: 'Please add all needed data'});
    }
})

router.route('/concerts/:id').delete((req, res) => {
    const concertIndex = db.concerts.findIndex(e => e.id == req.params.id)
    if (concertIndex != -1) {
        db.concerts.splice(concertIndex, 1);
        res.json({message: 'OK'});
        console.log(db.concerts);
    } else {
        (res.status(404).json({message: 'There is no such concert'}))
       
    }
})

router.route('/concerts/:id').put((req, res) => {
    const concertIndex = db.concerts.findIndex(e => e.id == req.params.id)
    const { performer, genre, price, day, image } = req.body;
    if (concertIndex != -1){
    if ( performer || genre || price || day || image ) {
        db.concerts[concertIndex] = {...db.concerts[concertIndex], ...req.body};
        res.json({message: 'OK'});
        console.log(db.concerts);
    } else {
        res.status(400).json({message: 'Please make some changes'});
    }
} else {
    (res.status(404).json({message: 'There is no such concert'}))
}
})

module.exports = router