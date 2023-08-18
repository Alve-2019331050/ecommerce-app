module.exports = balanceController = async(req,res) => {
    try {
        const {data} = await axios.get(`http://localhost:8082/api/bank/check-balance/${process.env.SUPPLIER_ACCOUNT_NO}/${process.env.SUPPLIER_SECRET_KEY}`); // to be changed
        if(data?.success){
            res.status(200).send({
                success:true,
                message:`Your current balance is ${data.balance}`
            });
        }
        else{
            res.status(500).send({
                success:false,
                message:data.message
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in fetching your bank balance'
        });
    }
}