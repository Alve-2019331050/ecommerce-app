const BankAccount = require("../models/account");



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

module.exports = createAccountController;
module.exports = checkBalanceController;