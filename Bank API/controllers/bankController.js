const BankAccount = require("../models/account");
const uuid = require('uuid');
const Transaction = require("../models/transaction");
const EmailBank = require('../models/emailBank');
const axios = require('axios');

//CREATE ACCOUNT controller || POST
const createAccountController = async (req, res) => {
    try {
        //variables to store data after data sent through POST request
        const { userEmail,acc_id, secret, balance } = req.body;

        //validation
        if (!userEmail || !acc_id || !secret || !balance) {
            return res.send({
                message: 'All fields are required.'
            });
        }

        //check if the account already exists

        //get user from collection
        const existingAccount = await BankAccount.findOne({ acc_id });

        //if already exists
        if (existingAccount) {
            return res.status(200).send({
                success: false,
                message: 'A user already uses this account. Try with a different bank account',
            });
        }

        //create and save new account
        const new_account = await new BankAccount({
            acc_id,
            secret,
            balance
        }).save();

        //save email with this account
        const {data} = await axios.post('http://localhost:8082/api/bank/saveAccountForEmail',{
            email:userEmail, 
            acc_id
        });

        if(!data?.success){
            return res.status(200).send({
                success:false,
                message:'Could not save email for this account'
            });
        }

        //send success response
        return res.status(201).send({
            success: true,
            message: "Account created successfully",
            new_account
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in creating bank account.',
            error
        })
    }
}

//GET AMOUNT controller || GET
const checkBalanceController = async (req, res) => {

    //get acc_id, secret from request parameters
    const { acc_id, secret } = req.params;

    try {
        //finding account from collection 
        const account = await BankAccount.findOne({ acc_id, secret });

        //if account does not exist
        if (!account) {
            return res.status(200).send({
                success: false,
                message: 'Account does not exist.',
            });
        }

        //send account balance
        return res.status(200).send({
            success: true,
            message: account.balance,
        }
        )

    } catch (error) {
        return res.status(500).send({
            success: false,
            error,
            message: 'Error while trying to check balance',
        })
    }
}

//ADD MONEY controller || POST
const addMoneyController = async (req, res) => {
    try {
        //variables to store data after data sent through POST request
        const { acc_id, addMoney } = req.body;

        //validation
        if (!acc_id || !addMoney) {
            return res.send({
                message: 'Account Id and money to be credited both are required.'
            });
        }

        //check if the account already exists
        //get user from collection
        const existingAccount = await BankAccount.findOne({ acc_id });

        //if account does not exist
        if (!existingAccount) {
            return res.status(200).send({
                success: false,
                message: 'Account does not exist.',
            });
        }

        //update account balance
        existingAccount.balance += addMoney;
        await existingAccount.save();

        //send success response
        return res.status(201).send({
            success: true,
            message: "Balance updated successfully",
            existingAccount
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in adding money.',
            error
        })
    }
}

//SUB MONEY || POST
const subMoneyController = async (req, res) => {
    try {
        //variables to store data after data sent through POST request
        const { acc_id, subMoney } = req.body;

        //validation
        if (!acc_id || !subMoney) {
            return res.send({
                message: 'Account Id and money to be debited both are required.'
            });
        }

        //check if the account already exists
        //get user from collection
        const existingAccount = await BankAccount.findOne({ acc_id });

        //if account does not exist
        if (!existingAccount) {
            return res.status(200).send({
                success: false,
                message: 'Account does not exist.',
            });
        }

        //update account balance
        existingAccount.balance -= subMoney;
        await existingAccount.save();

        //send success response
        return res.status(201).send({
            success: true,
            message: "Balance updated successfully",
            existingAccount
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in withdrawing money.',
            error
        })
    }
}

// MAKE TRANSACTION controller || POST
const makeTransactionController = async (req, res) => {
    try {
        //variables 
        const { from_ac, to_ac, money } = req.body;

        //validation
        if (!from_ac || !to_ac || !money) {
            return res.send({
                success: false,
                message: 'Please enter from account ID, to account ID and money.'
            });
        }

        //check if from_ac exists
        const fromAccount = await BankAccount.findOne({ acc_id: from_ac });

        //if does not
        if (!fromAccount) {
            return res.status(200).send({
                success: false,
                message: 'Account from which money is to be debited from does not exist.'
            })
        }

        //check if to_ac exists
        const toAccount = await BankAccount.findOne({ acc_id: to_ac });

        //if does not
        if (!toAccount) {
            return res.status(200).send({
                success: false,
                message: 'Account in which money is to be credited to does not exist.'
            })
        }

        //if fromAccount balance is less
        if (fromAccount.balance < money) {
            return res.status(200).send({
                success: false,
                message: 'Transaction Failed. Your account does not have enough balance to make this transaction.'
            })
        } else {
            // DEBIT
            fromAccount.balance -= money;
            await fromAccount.save();

            // CREDIT
            toAccount.balance += money;
            await toAccount.save();

            // GENERATE transaction ID, ie, trx_id
            trx_id = uuid.v4();

            // save transaction record(trx_id,from_ac,to_ac,money) to 'transaction' collection
            const new_transaction = await new Transaction({
                trx_id,
                from_ac,
                to_ac,
                balance: money
            }).save();

            return res.status(201).send({
                success: true,
                message: new_transaction
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in making transaction',
            error
        })
    }
}

// VERIFY TRANSACTION controller || POST
const verifyTransactionController = async (req, res) => {
    try {
        //variables
        const { trx_id } = req.body;

        //check if trx_id exists or not
        const existing_transaction = await Transaction.findOne({ trx_id });

        //if does not exist
        if (!existing_transaction) {
            return res.status(200).send({
                success: false,
                message: 'The provided transaction ID does not exist.'
            })
        }

        const ecom_id = existing_transaction.to_ac;
        const sup_id = 'supplier-123456';

        // fetching bank account associated with ecommerce organisation
        const ecommerce = await BankAccount.findOne({ acc_id: ecom_id });

        // if does not exist
        if (!ecommerce) {
            return res.status(200).send({
                success: false,
                message: 'Ecommerce organization account ID does not exist.'
            });
        }

        // fetching bank account associated with supplier
        const supplier = await BankAccount.findOne({ acc_id: sup_id });

        // if does not exist
        if (!supplier) {
            return res.status(200).send({
                success: false,
                message: 'The provided supplier account ID does not exist.'
            });
        }


        // STRATEGY : Ecommerce organization will have 5% profit from every purchase.

        // actual amount that was transacted from user to ecommerce organisation
        const actual_amount = existing_transaction.balance;
        // after giving 5% profit to ecommerce organisation
        const balance = actual_amount * 0.95;

        // DEBIT from ecom org
        ecommerce.balance -= balance;
        await ecommerce.save();

        // CREDIT to supplier
        supplier.balance += balance;
        await supplier.save();

        // DELETE transaction record from user to ecom from transaction collection
        const del = await Transaction.deleteOne({ _id: existing_transaction });
        console.log(`${del.deletedCount} document deleted from transaction table.`);

        // GENERATE new transaction ID
        const new_trx_id = uuid.v4();

        // save transaction record(trx_id,from_ac,to_ac,balance) to 'transaction' collection
        const new_transaction = await new Transaction({
            trx_id: new_trx_id,
            from_ac: ecom_id,
            to_ac: sup_id,
            balance
        }).save();

        return res.status(201).send({
            success: true,
            message: new_transaction
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in verifying transaction.',
            error
        })
    }
}

//CHECK ACCOUNT controller || GET
const checkAccountController = async (req, res) => {
    //variables
    const { acc_id } = req.params;
    try {
        // check if account exists or not
        const account = await BankAccount.findOne({ acc_id });

        //if does not
        if (!account) {
            return res.status(200).send({
                success: false,
                message: 'Account ID does not exist.'
            })
        }

        //if exists
        return res.status(201).send({
            success: true,
            message: 'Account ID exists.'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in checking account',
            error
        })

    }
}


// CHECK FOR EMAIL controller || GET
const checkForEmailController = async (req, res) => {
    //get email, acc_id from request parameters
    const { email } = req.params;

    try {
        // finding account from collection
        const account = await EmailBank.findOne({ email });

        //if account does not exist
        if (!account) {
            return res.status(200).send({
                success: false,
                message: 'Account does not exist.'
            });
        }

        //if exists
        if (account) {
            return res.status(201).send({
                success: true,
                message: account.acc_id
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error while checking account id for given email.'
        })
    }
}

const saveAccountForEmailController = async (req, res) => {
    try {
        //variables
        const { email, acc_id } = req.body;

        //validation
        if (!email || !acc_id) {
            return res.send({
                message: 'All fields are required.'
            })
        }

        //check if account is already saved for the email

        const existingAccount = await EmailBank.findOne({ email, acc_id });

        //if already exists
        if (existingAccount) {
            return res.status(200).send({
                success: false,
                message: 'There is already an account saved for this email.'
            })
        }

        //create and save new account
        const new_account = await new EmailBank({
            email,
            acc_id
        }).save();

        // send success response
        return res.status(201).send({
            success: true,
            message: 'Account ID for the given email ID saved successfully.',
            new_account
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
                success: false,
                error,
                message: 'Error in saving account ID for email.'
        })
    }
}

module.exports = {
    createAccountController,
    checkBalanceController,
    addMoneyController,
    subMoneyController,
    makeTransactionController,
    verifyTransactionController,
    checkAccountController,
    checkForEmailController,
    saveAccountForEmailController
};