const sortItems=async(req,res,next)=>{
    try{
        const{sort}=req.query
        req.sortOption=sort?{[sort.startsWith('-')?sort.slice(1):sort]:sort.startsWith('-')?-1:1}:{}
        next()

    }catch(error){
        res.status(500).json({message:'server error'})
    }

}


export default sortItems