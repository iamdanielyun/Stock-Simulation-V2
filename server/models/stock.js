const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    symbol: {type: String, required: false},         // AAPL
    companyName: {type: String, required: false},    // Apple Inc
    country: {type: String, required: false},        // United States
    currency: {type: String, required: false},       // USD
    exchange: {type: String, required: false},       // NASDAQ
    accessPlan: {type: String, required: false},     // Basic
    type: {type: String, required: false},           // Common Stock
});

const Stock = mongoose.model('stock', stockSchema);

module.exports = Stock;

