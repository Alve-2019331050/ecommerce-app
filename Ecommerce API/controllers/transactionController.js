const axios = require('axios');

module.exports.handleBuy = async(req,res) => {
    try {
        const {userAccountNo,transactionAmount} = req.body;

        // check if any user exists with this account no
        const {data} = await axios.get(`http://localhost:8082/api/bank/account/${userAccountNo}`);
        if(data?.success == false){
            res.status(500).send({
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
                    transactionRecord:transaction.trx_id
                });
                if(orderInfo?.success == false){
                    res.status(503).send({
                        success:false,
                        message:orderInfo.message
                    });
                }
            }
            else{
                res.status(501).send({
                    success:false,
                    message:transaction.message
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(502).send({
            success:false,
            message:'Could not complete the transaction'
        })
    } 
    res.status(200).send({
        success:true,
        message:'Order placed successfully'
    })
}