import express from 'express'
import newAuth from '../middleware/auth.mjs'
import userModel from '../model/user.mjs'
import jwt from 'jsonwebtoken'
const router=express.Router()
router.post('/register', async (req, res) => {
    const { username, email, password,role } = req.body;
  
    try {
      //const salt = await bcrypt.genSalt(10);
      //const hashPassword = await bcrypt.hash(password, salt);
  
      const newUser = new userModel({
        username,
        email,
        password,
        role
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Registration successful...' });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Server error' });
    }
  });
  
router.post('/login',async(req,res)=>{
    const{username,password}=req.body
    try{
        const user=await userModel.findOne({username})
        console.log(user)
        if(!user)
            return res.status(404).json({message:'user not found'})
        if(!(password==user.password))
            return res.status(404).json({message:'invalid credentials'})
        const token=jwt.sign({id:user._id,role:user.role},"manu",{expiresIn:'20m'})
        res.json({token})
    }
    catch(error){
        res.status(500).json({message:'server error'})
    }
})

router.get('/',newAuth(['admin']),async(req,res)=>{
    const user=await userModel.findById(req.user.id).select('-password')
    res.json({user})
})
export default router