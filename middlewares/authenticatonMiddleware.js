import JWT from 'jsonwebtoken'
import user_model from '../models/user_model.js';

//Protected routes token base

export const  requiresSignIn = async (req,res,next) =>{
    try{
        const decode = JWT.verify(
            req.headers.authorization,process.env.SECRET_KEY
        ); // we will get back the payload that we have sent earlier at login time
        // in our case that is the user._id
        req.user = decode;
        next();
    }catch(e){
        console.log(e);
    }
}

// admin access

export const  isAdmin = async (req,res,next)=>{
    try {
        const user = await user_model.findById(req.user._id);
        if(user.role!==1){
            return res.status(401).send({
                success : false,
                message : "Unauthorised Access"
            });
        }
        else{
            next();
        }
    } catch (e) {
        console.log(e);
        res.status(401).send({
            success : false,
            e,
            message:"Error in ADMIN middleware",
        });
    }
}