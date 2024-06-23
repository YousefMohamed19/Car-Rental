import { db } from '../../../../DB/connection.js'; 
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

//signup
export const signup = async (req, res,next) => {
  const { name, email,password,phoneNumber } = req.body;
  try {
    // Check if user with same username exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
        throw Error ("user already exist",{cause:404})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert new user
    const newUser = { name, email,password:hashedPassword,phoneNumber };
    await db.collection('users').insertOne(newUser);
    res.status(201).json({ message: 'User created successfully' ,success:true}); 
  } catch (err) {
    res.status(err.cause||500).json({message:err.message,success:false})
  } 
};


//signin
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user with provided email
    const user = await db.collection('users').findOne({ email ,password});
    if (!user) {
        throw Error ("user not found",{cause:404})
    }
    // Compare hashed password with provided password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw Error ("user not found",{cause:404})
    }
    res.status(200).json({ message: 'User signed in successfully', success: true });
  } catch (err) {
    res.status(err.cause||500).json({message:err.message,success:false})
  }
};

// get specific user
export const getUser = async (req, res,next) => {
  const { id } = req.params;
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) },{projection:{password:0}});
    
    if (!user) {
     throw Error ("user not found",{cause:404})
    }
    res.status(200).json({data:user});
  } catch (err) {
    res.status(err.cause||500).json({message:err.message,success:false})
  }
}

//get all user
export const getAllUser = async(req,res,next)=>{
    try{
        const user = await db.collection('users').find({},{projection:{password:0}}).toArray()
        res.status(200).json({data:user})
    }catch(err){
        res.status(500).json({message:err.message,success:false})
    }
}

//Update user
export const updateUser= async(req,res,next)=>{
    const {name,email,phoneNumber}= req.body
    const {id}=req.params
    try{
        const userUpdate= await db.collection('users').updateOne({_id:new ObjectId(id)},{$set:{name,email,phoneNumber}})
        if(userUpdate.matchedCount==0){
            throw Error("user not found",{cause:404})
        }
        if(userUpdate.modifiedCount==0){
            throw Error("user have same data",{cause:409})
        }
        res.status(200).json({message:"user updated successfully",success:true})

    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }
}
// Delete user
export const deleteUser = async(req,res,next)=>{
    const {id} =req.params
    try{
        const del = await db.collection('users').deleteOne({_id:new ObjectId(id)})
        if (del.deletedCount==0){
            throw Error ("user not found",{cause:404})
        }
        res.status(200).json({message:"user deleted successfully",success:true})

    }catch(err){
        res.status(err.cause||500).json({message:err.message,success:false})
    }
}


