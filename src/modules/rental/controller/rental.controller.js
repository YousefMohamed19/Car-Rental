import { ObjectId } from 'mongodb';
import { db } from '../../../../DB/connection.js';

// create rental
export const createRental = async (req, res,next) => {
    const { carId, userId, rentalDate, returnDate } = req.body;
    try {
        const carExist = await db.collection('cars').findOne({ _id: new ObjectId(carId) ,rentalStatus:"available" });
        if(!carExist) {
            throw Error("car not found",{cause:404})}
        //update car status
        await db.collection('cars').updateOne({ _id: new ObjectId(carId) }, { $set: {rentalStatus:"rented"} });
        const newRental = { carId, userId, rentalDate, returnDate };
        await db.collection('rentals').insertOne(newRental);
        res.status(201).json({ message: 'Rental created successfully', success: true });
    } catch (err) {
        res.status(err.cause||500).json({message:err.message,success:false}) 
    }
};


// Update Rental
export const updateRental = async (req, res,next) => {
    const { rentalId } = req.params;
    const { carId, userId, rentalDate, returnDate } = req.body;
    try {
        const rentalUpdate = { carId, userId, rentalDate, returnDate };
        await db.collection('rentals').updateOne({ _id:new ObjectId(rentalId) }, { $set: {rentalDate, returnDate} });
        if (rentalUpdate.matchedCount==0){
            throw Error ('Rental not found',{cause:404})
        }
        if (rentalUpdate.modifiedCount==0){
            throw Error ('Rental have same data',{cause:409})
        }
        res.status(200).json({ message: 'Rental updated successfully', success: true });
    } catch (err) {
        res.status(err.cause||500).json({message:err.message,success:false}) 
    }
}


// Delete Rental
export const deleteRental = async(req,res,next)=>{
    const { rentalId } = req.params;

  try {
    const rentalExist = await db.collection('rentals').findOne({ _id:new ObjectId(rentalId) });
    console.log(rentalExist);
    if(!rentalExist) {
        throw Error ('Rental not found',{cause:404})
    }
    const {carId} = rentalExist
    await db.collection('cars').updateOne({ _id: new ObjectId(carId) }, { $set: {rentalStatus:"available"} });
    const result = await db.collection('rentals').deleteOne({ _id: new ObjectId(rentalId) });

    if (result.deletedCount === 0) {
        throw Error ('Rental not found',{cause:404})
    }

    res.status(200).json({ message: 'Rental deleted successfully', success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
}
// get all rental
export const getAllRental = async (req, res) => {
    try {
        const rentals = await db.collection('rentals').find().toArray();
        res.status(200).json({ message: 'Rentals found successfully', data:rentals, success: true });
    } catch (err) {
        res.status(500).json({message:err.message,success:false}) 
    }
}
// Get special Rental
export const getRental = async (req, res,next) => {
    const { rentalId } = req.params;
    try {
        const rental = await db.collection('rentals').findOne({ _id:new ObjectId(rentalId)  });
        if(!rental) {
            throw Error ('Rental not found',{cause:404})
        }
        res.status(200).json({ message: 'Rental found successfully', data:rental, success: true });
    } catch (err) {
        res.status(err.cause || 500).json({message:err.message,success:false}) 
    }
}