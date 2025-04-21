const userOrders = async (req, res) => {

    try {

        const {userId} = req.body

        const orders = await orderModel.find({userId})

        res.json({success: true, orders})


        
    } catch (error) {

        console.log(error)

        res.json({success: false, message: error.message})
        
    }

}