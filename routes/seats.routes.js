const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4} = require('uuid')


router.route('/seats').get((req, res ) => {
    db.seats.length > 0 ?
    (res.json(db.seats)) :
    (res.status(404).json({message: 'There are no seats'}));
})

router.route('/seats/:id').get((req, res) => {
    db.seats.find(e => e.id == req.params.id) ?  
    res.json(db.seats.find(e => e.id == req.params.id)) : 
    res.status(404).json({message: 'There is no such seat'})
    })

router.route('/seats').post((req, res) => {
    const id = uuidv4();
    const {day, seat, client, email} = req.body;

    if (day && seat && client && email) {
        if(!db.seats.some(e => (e.day == day && e.seat == seat))){
        db.seats.push({id, ...req.body})
        res.json({message: 'OK'});
           req.io.emit('seatsUpdated', db.seats)

        //console.log(db.seats);
        } else {
            res.status(423).json({message: 'The slot is already taken'})
        }  
    } else {
        res.status(400).json({message: 'Please add all needed data'});
    }
})

router.route('/seats/:id').delete((req, res) => {
    const seatIndex = db.seats.findIndex(e => e.id == req.params.id);
    if (seatIndex != -1) {
        db.seats.splice(seatIndex, 1);
        console.log(db.seats)
        res.json({message: 'OK'})
    } else {
        res.json({message: 'There is no such seat'})
    }
})

router.route('/seats/:id').put((req, res ) => {
    const seatIndex = db.seats.findIndex(e => e.id == req.params.id);
    const {day, seat, client, email} = req.body;
    if (seatIndex != -1) {
        if (day || seat || client || email) {
            db.seats[seatIndex] = {...db.seats[seatIndex], ...req.body};
            res.json({message: 'OK'});
            console.log(db.seats);
        } else {
            res.status(401).json({message: 'Please make at least one change'})
        }
    } else {
        res.status(404).json({message: 'There is no such seat'})
    }
})

module.exports = router