const axios = require('axios');

module.exports = balanceController = async(req,res) => {
    try {
        const {data} = await axios.get(`http://localhost:8082/api/bank/checkBalance/${process.env.ECOMMERCE_ACCOUNT_NO}/${process.env.ECOMMERCE_SECRET_KEY}`);
        if(data?.success){
            return res.status(200).send({
                success:true,
                message:`Your current balance is ${data.message}`
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
            message:'Error in fetching your bank balance'
        });
    }
}