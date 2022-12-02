const Seat = require('../models/seats.model')
const sanitize = require('mongo-sanitize');


exports.getAll = async (req, res ) => {
    try {
        res.json(await Seat.find())
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getById = async (req, res) => {
    try {
        const seat = await Seat.find({_id: req.params.id })
        if (!seat) {
            res.status(404).json({message: 'Not found...'})
        } 
        else res.json(seat)
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}



exports.post = async (req, res) => {
   const client = sanitize(req.body.client);
   const email = sanitize(req.body.email);
   const {day, seat } = req.body;

    try {
        const newSeat = new Seat({
            day: day,
            seat: seat,
            client: client,
            email: email
        })
        await newSeat.save();
        req.io.emit('seatsUpdated', await Seat.find())
        res.json({ message: 'OK'})
                  
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: err})
    }
}

exports.delete = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id)
        if (seat) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' })
        } 
        else res.status(404).json({message: 'Not found...'})
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

exports.put = async (req, res ) => {
    try {
    const {day, seat, client, email} = req.body;
    const seatUpdated = await Seat.findById(req.params.id);
    if (seatUpdated) {
        seatUpdated.day = day;
        seatUpdated.seat = seat;
        seatUpdated.client = client;
        seatUpdated.email = email;
    }
        await seatUpdated.save();
        res.json({ message: 'OK'});
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}