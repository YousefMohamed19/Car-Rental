import { Router } from "express";
import { addCar, deleteCar, getAllCar, getCar, updateCar } from "../controller/car.controller.js";
export const carRouter = Router();
carRouter.post("/add", addCar)
carRouter.get("/:carId", getCar)
carRouter.get("/", getAllCar)
carRouter.put("/:carId", updateCar)
carRouter.delete("/:carId", deleteCar)