const mongoose = require('mongoose');
const schema = mongoose.Schema;

var priceSchema = new mongoose.Schema({
    product: {
        type: schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    price: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

priceSchema.index({ name: 'text' });
var prices = mongoose.model('prices', priceSchema);
module.exports = {
    prices,
}