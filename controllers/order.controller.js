import CartProductModel from "../models/cartProduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
export const cashOnDeliveryController = async (req, res) => {
  try {
    const userId = req.userId;

    const {list_item, totalAmt , addressId , subTotalAmt} = req.body;
    // console.log(list_item)
    // console.log(totalAmt)
    // console.log(addressId)
    // console.log(subTotalAmt)

    const payload = list_item.map(el => {
        return({
            userId  : userId ,
            orderId : `ORD-${new mongoose.Types.ObjectId()}`,
            productId : el.productId._id,
            product_details :{
                name: el.productId.name,
                image : el.productId.image
            },
            paymentId :"",
            paymentStatus : "Cash On Delivery",
            delivery_address: addressId,
            subTotalAmt : totalAmt,
            totalAmt : subTotalAmt,
        })
    })


    const generateOrder = await OrderModel.insertMany(payload)

    ///Remove From Cart
    
    const removeCartItems = await CartProductModel.deleteMany({userId : userId})
    const updateInUser = await UserModel.updateOne({_id: userId} , {shopping_cart : [] } )
     
   return res.json({
    message : "Order Successfully",
    error : false,
    success : true,
    data: generateOrder
   })
   
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
