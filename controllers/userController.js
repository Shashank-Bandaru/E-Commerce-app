import user_model from "../models/user_model.js";
import order_model from "../models/order_model.js";

export const getAllUserController = async (req, res) => {
    try {
      const user = await user_model.find({role:{$ne : 1}});
      res.status(200).send({
        success: true,
        message: "All User List",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while fetching the user list",
      });
    }
  };
 

export const deleteUserController = async(req,res)=>{
    try {
        const { id } = req.params;
        await order_model.deleteMany({
          buyer: id,
        });
        await user_model.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "User has been deleted successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while deleting the requested user",
        });
      }
};