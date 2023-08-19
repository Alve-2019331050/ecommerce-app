const mongoose = require('mongoose');


//desigining emailBankSchema
//schema : defines structure of document(fields, data type etc)
const emailBankSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    acc_id: {
        type: String
    }
});

//connecting schema defined for accounts, i.e, emailBankSchema
// to collection created in mongoDB database, ie, collection named email_banks

const EmailBank = mongoose.model('email_banks', emailBankSchema);

module.exports = EmailBank;