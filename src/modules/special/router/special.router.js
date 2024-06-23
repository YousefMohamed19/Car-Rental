import { Router } from "express";
import { getCarWithSpecificModel, getSpecialCar, getSpecificModel, getTwoStatus } from "../controller/special.controller.js";

export const specialRouter = Router();
specialRouter.get("/getCar",getSpecialCar)
specialRouter.get("/:name",getSpecificModel)
specialRouter.get("/getCarRented/:name",getCarWithSpecificModel)
specialRouter.get("/getModelStatus/:name/:rentalStatus",getTwoStatus)
