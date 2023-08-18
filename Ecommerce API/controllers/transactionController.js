module.exports.handleBuy = async(req,res) => {
    try {
        const {userAccountNo,transactionAmount,product} = req.body;

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
                senderAccountNo: userAccountNo,
                receiverAccountNo: 12345678, // to be changed
                transactionAmount
            });
            if(transaction?.success){
                const {data:transactionRecord} = await axios.post('http://localhost:8082/api/bank/create-transaction-record',{
                    senderAccountNo: 12345678, // to be changed
                    receiverAccountNo: 12345678, //to be changed
                    transactionAmount
                });
                if(transactionRecord?.success){
                    const {data:orderInfo} = await axios.post('http://localhost:8081/api/supplier/supply-product',{
                        product,
                        transactionRecord
                    });
                    if(orderInfo?.success == false){
                        res.status(503).send({
                            success:false,
                            message:'Sorry,could not supply products'
                        });
                    }
                }
                else{
                    res.status(504).send({
                        success:false,
                        message:'Error occured in creating transaction record'
                    });
                }
            }
            else{
                res.status(501).send({
                    success:false,
                    message:'Could not complete the transaction'
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