import user_model from "../models/user_model.js";
import { comparePassword, hashingPassword } from "../helpers/authenticationHelper.js";
import validator from "validator";
import JWT from 'jsonwebtoken'
import order_model from "../models/order_model.js";

const createToken=(_id)=>{
    return JWT.sign({_id},process.env.SECRET_KEY,{expiresIn:"2d"});
}

export const regController = async (req,res)=>{
    try{
        const {name,email,password,phone,address,answer} = req.body;

        // performing the validation
        if(!name){
            return res.send({message:'Name is Required'});
        }
        if(!email){
            return res.send({message:'Email Id is Required'});
        }
        if(!password){
            return res.send({message:'Password is Required'});
        }
        if(!phone || phone.trim()===''){
            return res.send({message:'Phone number is Required'});
        }
        if(!address || address.trim()===''){
            return res.send({message:'Address is Required'});
        }
        if(!answer){
            return res.send({message:"Security question's answer is Required"});
        }

        if(!validator.isEmail(email)){
            return res.send({message:"Please Enter a Valid Email"});
        }
        if(!validator.isStrongPassword(password)){
           return res.send({message:`Password is not strong enough.
                Strong password must contain a minimum of 8 characters with atleast one lowercase alphabet
                ,one uppercase alphabet
                ,number and a special character`});
        }

        //check for the user
        const existingUser = await user_model.findOne({email});

        //if email/user already exists 
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'This email has already been registered so please go to login page or change email id',
            })
        }

        // register if new user
        const hPassword = await hashingPassword(password);

        //create a new user with the given details
        const user = await new user_model({
            name,email,phone,address,password:hPassword,answer
        }).save();
        const token = createToken(user._id); //sign up is like automatic login
        res.status(200).send({
            success:true,
            message:"User has been registered sucessfully",
            email:user.email,
            token,
        });
    }catch(e){
        console.log(e);
        res.status(400).send(
            {
                success : false,
                message : "Error in registration process ",
                e
                
            }
        )
    }
};


// Login POST
export const loginController =async (req,res)=>{
    try {
        const {email,password} = req.body;
        //validation
        if(!password||!email){
            return res.status(400).send({
                success : false,
                message : "Invalid Email or Password"
            });
        }
        // check whether user  exists or not
        const user = await user_model.findOne({email});
        if(!user){
            return res.status(400).send({
               success : false,
               message : " Email is not registered" 
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(400).send({
                success:false,
                message:"Invalid Password",
            });
        }
        //token
        const token = await createToken(user._id); // here we are using the user._id as the payload
        
        res.status(200).send({
            success:true,
            message : "Login successful",
            user : {
                name:user.name,
                email:user.email,
                phone : user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })

    } catch (e) {
        console.log(e);
        res.status(400).send({
            success:false,
            message:"Error in login process",
            e
        });
    }
};


//forgotPasswordController
export const forgotPasswordController = async (req,res)=>{
    try {
        const {email,answer,newpassword} = req.body;
        if(!email){
            res.status(400).send({message:"Email is required"});
        }
        if(!answer){
            res.status(400).send({message:"Security question's answer is required"});
        }
        if(!newpassword){
            res.status(400).send({message:"New Password is required"});
        }
        //check
        const user = await user_model.findOne({email,answer});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Security Question's answer"
            });
        }
        const hashed = await hashingPassword(newpassword);
        await user_model.findByIdAndUpdate(user._id,{password:hashed}); 
        res.status(200).send({
            success:true,
            message:"Password has been reset successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }

};

//test controller

export const testController = (req,res)=>{
    try {
        res.send('Just checking the functionality of the middleware');
    } catch (e) {
        console.log(e);
        res.send({e});
    }
};

// update user profile
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await user_model.findById(req.user._id);
      //password
      if (password && password.length < 8) {
        return res.json({ error: `Password is not strong enough.
                Strong password must contain a minimum of 8 characters with atleast one lowercase alphabet
                ,one uppercase alphabet
                ,a number and a special character`});
      }
      /*Password is not strong enough.
                Strong password must contain a minimum of 8 characters with atleast one lowercase alphabet
                ,one uppercase alphabet
                ,number and a special character */
      const hashedPassword = password ? await hashedPassword(password) : undefined;
      const updatedUser = await user_model.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error wHile updating profile",
        error,
      });
    }
  };

  //get user orders
  export const getOrdersController = async(req,res)=>{
    try {
        const orders = await order_model
          .find({ buyer: req.user._id })
          .populate("products", "-image")
          .populate("buyer", "name");
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while fetching the user orders",
          error,
        });
      }
  };
  //orders

export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await order_model
        .find({})
        .populate("products", "-image")
        .populate("buyer", "name")
        .sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while geting all orders by all users ",
        error,
      });
    }
  };

  //order status
export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await order_model.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while Updating Order status",
        error,
      });
    }
  };

  //delete orders
  export const deleteOrderController = async(req,res)=>{
    try {
        const { orderId } = req.params;
        await order_model.findByIdAndDelete(orderId);
        res.status(200).send({
          success: true,
          message: "Order Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while deleting the requested order",
        });
      }
  }