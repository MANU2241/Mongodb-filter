const paginateItems=async(req,res,next)=>{
    try{
        const{page=1,limit=10}=req.query
    const pageNumber=parseInt(page,10)
    const pageSize=parseInt(limit,10)
    req.pagination={skip:(pageNumber-1)*pageSize,
        limit:pageSize,
        pageNumber
    }
    next()
    }catch(error){
        res.status(500).json({message:'server error'})
    }
}

export default paginateItems