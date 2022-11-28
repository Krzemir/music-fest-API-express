const Concert = require('../models/concert.model');
const Seat = require('../models/seats.model');
const Workshop = require('../models/workshop.model');

exports.getAll = async (req, res) => {
    try {
        const concerts = await Concert.find();
        const concertsParsed = JSON.parse(JSON.stringify(concerts));

        for (let concert of concertsParsed) {

            const busySeats = await Seat.find({ day: concert.day})
            const seats = 50 - busySeats.length;
            concert['seats'] = seats;
            
            const workshops = await Workshop.find({ concertId: concert._id})
            console.log(workshops)
            concert['workshops'] = workshops;
        }
        res.json(concertsParsed)

    }
    catch(err) {
        res.status(500).json({ message: err});
    }
}

exports.getById = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(!concert) res.status(404).json({ message: 'Not Found' });
        else res.json(concert)
    }
    catch(err) {
        res.status(500).json({ message: err})
    }
}

exports.getByPerformer = async (req, res) => {
    try {
        const concert = await Concert.find({ performer: req.params.performer} );
        if(!concert) res.status(404).json({ message: 'Not Found' });
        else res.json(concert)
    }
    catch(err) {
        res.status(500).json({ message: err})
    }
}

exports.getByGenre = async (req, res) => {
    try {
        const concert = await Concert.find({ genre: req.params.genre} );
        if(!concert) res.status(404).json({ message: 'Not Found' });
        else res.json(concert)
    }
    catch(err) {
        res.status(500).json({ message: err})
    }
}

exports.getByDay = async (req, res) => {
    try {
        const concert = await Concert.find({ day: req.params.day} );
        
        if(!concert) res.status(404).json({ message: 'Not Found' });
        else res.json(concert)
    }
    catch(err) {
        res.status(500).json({ message: err})
    }
}

exports.getByPrice = async (req, res) => {
    try {
        const concert = await Concert.find({
            "price": { $gte: req.params['price_min'], $lte: req.params['price_max'] },
         })
         if(!concert) res.status(404).json({ message: 'Not Found' });
        else res.json(concert)
    }
    catch(err) {
        res.status(500).json({ message: err})
    }
}


exports.post = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image});
        await newConcert.save();
        res.json({ message: 'OK'})
    }
    catch(err) {
        res.status(500).json({message: err})
    }
}

exports.put = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const concert = await Concert.findById(req.params.id);
        if(concert) {
            concert.performer = performer;
            concert.genre = genre;
            concert.price = price;
            concert.day = day;
            concert.image = image;
            await concert.save();
            res.json({ message: 'OK'})
        }
        else res.status(404).json({ message: 'Concert not found...'})
    }
    catch (err) {
        res.status(500).json({ message: err});
    }
}

exports.delete = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(concert) {
            await Concert.deleteOne({ _id: req.params.id});
            res.json({ message: 'OK'})
        }
        else res.status(404).json({ message: 'Concert not found...'})
    }
    catch(err) {
        res.status(500).json({ message: err})
    }
}

