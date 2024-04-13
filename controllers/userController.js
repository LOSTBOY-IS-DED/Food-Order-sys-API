// get user INFO
const userModel = require('../models/userModel');

const getUserController = async(req,res)=>{
    try{
        //find user
        const user = await userModel.findById({_id: req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message: "User not Found",
            });
        }
        //hide password
        user.password = undefined;
        //response
        res.status(200).send({
            success:true, 
            message:"user get successfuly",
            user
        });
    
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get User API",
            error
        })
    }
};

//UPDATE USER

const updateUserController =async(req,res)=>{
    try{
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found",
            });
        }
        //update
        const{userName, address, phone} =req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone
        //save
        await user.save()
        res.status(200).send({
            success:true,
            message:"User Updated Successfully"
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update User Api",
            error
        });
    }
}




module.exports ={getUserController, updateUserController};