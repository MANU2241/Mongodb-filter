import express from 'express'
import itemModel from '../model/item.mjs'
import filterItems from '../middleware/filter.mjs'
import paginateItems from '../middleware/paginate.mjs'
import sortItems from '../middleware/sort.mjs'
import newAuth from '../middleware/auth.mjs'
const router=express.Router()
router.get('/',filterItems,sortItems,paginateItems,async(req,res)=>{
    try{
        const { filterOption, sortOption, pagination } = req;
        const items=await itemModel.find(filterOption).skip(pagination.skip).sort(sortOption).limit(pagination.limit)
      

        if(items.length===0)
           return res.status(404).json({message:'items not found'})
        res.json({data:items})
    }catch(error){
        res.status(500).json({message:'server error'})
    }
})

router.post('/',newAuth(['admin']),async(req,res)=>{
    const{name,category,price}=req.body
    try{
        const items=new itemModel({name,category,price})
        await items.save()
        if(!items)
            res.status(404).json({message:'unable to ad items'})
        res.status(201).json({message:'item added',data:items})
    }
    catch(error){
        res.status(500).json({message:'server error'})
    }
})

router.get('/:id',async(req,res)=>{
    
    try{
        const items=await itemModel.findById(req.params.id)
        
        if(!items)
            res.status(404).json({message:'items not found'})
        res.json({data:items})
    }
    catch(error){
        res.status(500).json({message:'server error'})
    }
})

router.put('/:id',async(req,res)=>{
    
    try{
        const items=await itemModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        
        if(!items)
            res.status(404).json({message:'unable to update'})
        res.status(201).json({message:'updated',data:items})
    }
    catch(error){
        res.status(500).json({message:'server error'})
    }
})

router.delete('/:id',async(req,res)=>{
    
    try{
        const items=await itemModel.findByIdAndDelete(req.params.id)
        
        if(!items)
            res.status(404).json({message:'unable to delete items'})
        res.status(201).json({message:'deleted',data:items})
    }
    catch(error){
        res.status(500).json({message:'server error'})
    }
})

export default router