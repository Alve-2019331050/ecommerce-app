const mongoose = require('mongoose');


// desigining transactionSchema
// schema : defines structure of document(fields, data type etc)
const transactionSchema = new mongoose.Schema({
    trx_id: {
        type: String,
        unique: true,
    },
    from_ac: String,
    to_ac: String,
    balance: Number,
});

// connecting schema defined for accounts, i.e, transactionSchema
// to collection created in mongoDB database, ie, collection named transaction

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;