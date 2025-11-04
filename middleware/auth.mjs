import jwt from 'jsonwebtoken'
const newAuth=(roles)=>{
    return (req,res,next)=>{
        const token=req.header('Authorization')
        console.log({token})
        if(!token)
            res.status(404).json({message:'access denaid'})
        try{
            const verified=jwt.verify(token.split(" ")[1],"manu")
            console.log(verified)
            req.user=verified
            if(!roles.includes(req.user.role))
                res.status(401).json({message:'unauthorized user'})
            next()
        }catch(error){
            res.status(500).json({message:'server error'})
        }

    }
}
export default newAuth