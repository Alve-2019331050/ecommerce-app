const BankAccount = require("../models/account");
const uuid = require('uuid');
const Transaction = require("../models/transaction");

//CREATE ACCOUNT controller || POST
const createAccountController = async (req, res) => {
    try {

        //variables to store data after data sent through POST request
        const { acc_id, secret, balance } = req.body;


        //validation
        if (!acc_id || !secret || !balance) {
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

        //send success response
        res.status(201).send({
            success: true,
            message: "Account created successfully",
            new_account
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating bank account.',
            error
        })
    }

}

//GET AMOUNT controller || GET
const checkBalanceController = async (req, res) => {

    //get acc_id, secret for request parameters
    const { acc_id, secret } = req.params;

    try {

        //finding account from collection 
        const account = await BankAccount.findOne({ acc_id, secret });

        //if account does not exist
        if (!account) {
            res.status(404).send({
                success: false,
                message: 'Account does not exist.',
            });
        }

        //send account balance
        res.status(200).send({
            success: true,
            message: account.balance,
        }
        )


    } catch (error) {
        res.status(500).send({
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
            return res.status(404).send({
                success: false,
                message: 'Account does not exist.',
            });
        }

        //update account balance
        existingAccount.balance += addMoney;
        await existingAccount.save();

        //send success response
        res.status(201).send({
            success: true,
            message: "Balance updated successfully",
            existingAccount
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
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
            return res.status(404).send({
                success: false,
                message: 'Account does not exist.',
            });
        }

        //update account balance
        existingAccount.balance -= subMoney;
        await existingAccount.save();

        //send success response
        res.status(201).send({
            success: true,
            message: "Balance updated successfully",
            existingAccount
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
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
                message: 'Please enter from account ID, to account ID and money.'
            });
        }

        //check if from_ac exists
        const fromAccount = await BankAccount.findOne({ acc_id: from_ac });

        //if does not
        if (!fromAccount) {
            return res.status(404).send({
                success: false,
                message: 'Account from which money is to be debited from does not exist.'
            })
        }

        //check if to_ac exists
        const toAccount = await BankAccount.findOne({ acc_id: to_ac });

        //if does not
        if (!toAccount) {
            return res.status(404).send({
                success: false,
                message: 'Account in which money is to be credited to does not exist.'
            })
        }

        //if fromAccount balance is less
        if (fromAccount.balance < money) {
            return res.status(200).send({
                success: false,
                message: 'Transaction Failed. Receiver account does not have enough balance to make this transaction.'
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
                money
            }).save();

            return res.status(201).send({
                success: true,
                message: new_transaction
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in making transaction',
            error
        })
    }

}

module.exports = {
    createAccountController,
    checkBalanceController,
    addMoneyController,
    subMoneyController,
    makeTransactionController
};