const cartModel = require('../models/cartModel');

module.exports.removeController = async(req,res) => {
    try {
        const {userEmail,productId} = req.params;

        const data = await cartModel.deleteOne({userEmail:userEmail,productId:productId});
        if(data){
            res.status(200).send({
                success:true,
                message:'Removed product successfully'
            });
        }
        else{
            res.status(501).send({
                success:false,
                message:'Error in removing product'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in removing product'
        });
    }     
};

module.exports.insertController = async(req,res) => {
    try {
        const {userEmail,productId} = req.body;

        const data = await new cartModel({
            userEmail,
            productId,
            quantity:1
        }).save();

        if(data){
            res.status(200).send({
                success:true,
                message:'Product inserted successfully'
            });
        }
        else{
            res.status(501).send({
                success:false,
                message:'Could not insert product'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Could not insert product'
        });
    }     
};

module.exports.getCartItemsController = async(req,res) => {
    try {
        const {userEmail} = req.params;

        const items = await cartModel.find({userEmail:userEmail});
        if(items){
            res.status(200).send({
                success:true,
                message:'Items fetched',
                items
            });
        }
        else{
            res.status(501).send({
                success:false,
                message:'Could not fetch cart items'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Could not fetch cart items'
        });
    }
}