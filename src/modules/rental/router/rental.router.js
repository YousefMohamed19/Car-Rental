import { Router } from "express";
import { createRental, deleteRental, getAllRental, getRental, updateRental } from "../controller/rental.controller.js";
export const rentalRouter = new Router();
rentalRouter.post("/create", createRental)
rentalRouter.put("/update/:rentalId", updateRental)
rentalRouter.delete("/delete/:rentalId", deleteRental)
rentalRouter.get("/get", getAllRental)
rentalRouter.get("/get/:rentalId", getRental)