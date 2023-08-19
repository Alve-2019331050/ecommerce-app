const axios = require('axios');

module.exports.supplyProductController = async(req,res) => {
    try {
        const {transactionRecord} = req.body;
        const {data} = await axios.post('http://localhost:8082/api/bank/verifyTransaction',{
            trx_id:transactionRecord
        });
        if(data?.success){
            res.status(200).send({
                success:true,
                message:'Product Supplied'
            });
        }
        else{
            res.status(404).send({
                success:false,
                message:data.message
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Could not supply product'
        });
    }
}