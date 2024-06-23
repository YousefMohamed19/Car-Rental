import { db } from '../../../../DB/connection.js';


// Get all cars whose model is ‘Honda’ and ‘Toyota’ (using query params)

export const getSpecialCar = async (req, res,next) => {
  try{
    const model = await db.collection('cars').find({name:{$in:['Honda','Toyota']}}).toArray();
    if(model.length==0){
      return res.status(404).json({message:'No Honda or Toyota found'})
    }
    res.status(200).json({data:model})
  }catch(err){
    res.status(500).json({message:err.message})
  }
}


// Get Available Cars of a Specific Model.
export const getSpecificModel = async(req,res,next)=>{
  const {name}= req.params
  try{
    const model = await db.collection('cars').find({name,rentalStatus:'available'}).toArray();
    if(model.length==0){
      throw Error ('No available car',{cause:404})
    }
    res.status(200).json({data:model})
  }catch(err){
    res.status(err.cause||500).json({message:err.message})
  }
}

//Get Cars that are Either rented or of a Specific Model.
export const getCarWithSpecificModel = async(req,res,next)=>{
  const {name}= req.params
  try{
    const model = await db.collection('cars').find({$or:[{rentalStatus:'rented'},{name}]}).toArray();
    if(model.length==0){
      throw Error ('No available car',{cause:404})
    }
    res.status(200).json({data:model})
  }catch(err){
    res.status(err.cause||500).json({message:err.message})
  }
}


//Get Available Cars of Specific Models or Rented Cars of a Specific Model
export const getTwoStatus = async(req,res,next)=>{
  const {name,rentalStatus}=req.params
  try{
    const model = await db.collection('cars').find({$or:[{name,rentalStatus},{name,rentalStatus}]}).toArray();
    if(model.length==0){
      throw Error ('No available car',{cause:404})
    }
    res.status(200).json({data:model})
  }catch(err){
    res.status(err.cause||500).json({message:err.message})
  }
}