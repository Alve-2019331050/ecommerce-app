const axios = require('axios');

module.exports.supplyProductController = async(req,res) => {
    try {
        const {transactionRecord} = req.body;
        const {data} = await axios.post('http://localhost:8082/api/bank/verifyTransaction',{
            trx_id:transactionRecord
        });
        if(data?.success){
            return res.status(200).send({
                success:true,
                message:'Product Supplied'
            });
        }
        else{
            return res.status(200).send({
                success:false,
                message:data.message
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Could not supply product'
        });
    }
}