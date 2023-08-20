const axios = require('axios');
const cartModel = require('../models/cartModel');

module.exports.handleBuy = async(req,res) => {
    try {
        const {userEmail,userAccountNo,transactionAmount} = req.body;

        // check if any user exists with this account no
        const {data} = await axios.get(`http://localhost:8082/api/bank/checkAccount/${userAccountNo}`);
        if(data?.success == false){
            return res.status(200).send({
                success:false,
                message:data.message
            });
        }
        else{
            const {data: transaction} = await axios.post('http://localhost:8082/api/bank/makeTransaction',{
                from_ac: userAccountNo,
                to_ac: process.env.ECOMMERCE_ACCOUNT_NO,
                money: transactionAmount
            });
            if(transaction?.success){
                const {data:orderInfo} = await axios.post('http://localhost:8081/api/supplier/supply-product',{
                    transactionRecord:transaction.message.trx_id
                });
                if(orderInfo?.success == false){
                    return res.status(200).send({
                        success:false,
                        message:orderInfo.message
                    });
                }
                else{
                    //transaction is successful..empty the cart
                    const empty = await cartModel.deleteMany({userEmail:userEmail});
                    if(!empty){
                        return res.status(200).send({
                            success:false,
                            message:'Could not clear the cart'
                        });
                    }
                }
            }
            else{
                return res.status(200).send({
                    success:false,
                    message:transaction.message
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(502).send({
            success:false,
            message:'Could not complete the transaction'
        })
    }
    return res.status(200).send({
        success:true,
        message:'Order placed successfully'
    });
}