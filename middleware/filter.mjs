const filterItems=async(req,res,next)=>{
    try{
        const {category,minprice,maxprice}=req.query
        const filter={}
        if(category)
            filter.category=category
        if(minprice || maxprice){
            filter.price={}
            if(minprice)
                filter.price.$gte=parseFloat(minprice)
            if(maxprice)
                filter.price.$lte=parseFloat(maxprice)
        }
        req.filterOption=filter
        next()
    }catch(error){
        res.status(500).json({message:'server error'})
    }
}


export default filterItems