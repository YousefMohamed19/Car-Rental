import { ObjectId } from 'mongodb';
import { db } from '../../../../DB/connection.js';

// add car
export const addCar = async (req, res,next) => {
  const { name, model, rentalStatus } = req.body;

  try {
    const newCar = { name, model, rentalStatus };
    await db.collection('cars').insertOne(newCar);
    res.status(201).json({ message: 'Car added successfully', success: true });
  } catch (err) {
    res.status(500).json({message:err.message,success:false}) 
  }
};


//Get a specific car
export const getCar = async (req, res,next) => {
  const { carId } = req.params;
  try {
    const car = await db.collection('cars').findOne({ _id:new ObjectId(carId)  });
    if(!car) {
        throw Error ('Car not found',{cause:404})
    }
    res.status(200).json({ message: 'Car found successfully', data:car, success: true });
  } catch (err) {
    res.status(err.cause || 500).json({message:err.message,success:false}) 
  }
}

//Get all cars
export const getAllCar = async (req, res) => {
  try {
    const cars = await db.collection('cars').find().toArray();
    res.status(200).json({ message: 'Cars found successfully', data:cars, success: true });
  } catch (err) {
    res.status(500).json({message:err.message,success:false}) 
  }
}

//Update car
export const updateCar = async (req, res,next) => {
  const { carId } = req.params;
  const { name, model, rentalStatus } = req.body;
  try {
    const carUpdate = { name, model, rentalStatus };
    await db.collection('cars').updateOne({ _id:new ObjectId(carId) }, { $set: {rentalStatus} });
    if (carUpdate.matchedCount==0){
        throw Error ('Car not found',{cause:404})
    }
    if (carUpdate.modifiedCount==0){
        throw Error ('Car have same data',{cause:409})
    }
    res.status(200).json({ message: 'Car updated successfully', success: true });
  } catch (err) {
    res.status(err.cause||500).json({message:err.message,success:false}) 
  }
}


//Delete car
export const deleteCar = async (req, res) => {
  const { carId } = req.params;
  try {
    const del = await db.collection('cars').deleteOne({ _id:new ObjectId(carId) });
    if (del.deletedCount==0){
        throw Error ('Car not found',{cause:404})
    }
    res.status(200).json({ message: 'Car deleted successfully', success: true });
  } catch (err) {
    res.status(err.cause||500).json({message:err.message,success:false}) 
  }
}