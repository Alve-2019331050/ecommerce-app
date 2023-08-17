const mongoose = require('mongoose');


//desigining accountSchema
//schema : defines structure of document(fields, data type etc)
const accountSchema = new mongoose.Schema({
    acc_id: {
        type: String,
        unique: true,
    },
    secret: String,
    balance: Number,
});

//connecting schema defined for accounts, i.e, accountSchema
// to collection created in mongoDB database, ie, collection named bank_accounts

const BankAccount = mongoose.model('bank_accounts', accountSchema);

module.exports = BankAccount;