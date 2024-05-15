const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    investments: {
        cash: {type: Number, required: true},
        stock_list: [{                      
            company: {type: String, required: true},
            count: {type: Number, required: true}, 
            symbol: {type: String, required: true}
        }],
        stocks: [{
            symbol: {type: String, required: true},
            company: {type: String, required: true},
            price_purchased: {type: Number, required: true}
        }]
    },
    history: {
        time_created: {type: Date, required: true},
        entries: [{
            time: {type: Date, required: true},
            total_value: {type: Number, required: true}
        }]
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;

