const updateStatus = async (req, res) => {

    try {

        const { orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})

        res.json({success: true, message: 'Status Updated'})
        
    } catch (error) {

        console.log(error)
        res.json({success: false, message: error.message})
        
    }

}