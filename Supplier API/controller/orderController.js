module.exports.supplyProductController = async(req,res) => {
    try {
        const {transactionRecord} = req.body;
        const {data} = await axios.post('http://localhost:8082/api/bank/verify-transaction',{
            transactionRecord
        });
        if(data?.success){
            res.status(200).send({
                success:true,
                message:'Product Supplied'
            });
        }
        else{
            res.status(501).send({
                success:false,
                message:'Could not verify transaction record'
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