const Concert = require('../models/concert.model')

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find())
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