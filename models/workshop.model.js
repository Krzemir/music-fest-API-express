const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    name: { type: String, required: true},
    concert: { type: Object, required: true},
})

module.exports = mongoose.model('Workshop', workshopSchema)