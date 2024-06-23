//import module
import express from 'express';
import { connectDB } from './DB/connection.js';
import { userRouter } from './src/modules/user/router/user.router.js';
import { carRouter } from './src/modules/car/router/car.router.js';
import { rentalRouter } from './src/modules/rental/router/rental.router.js';
import { specialRouter } from './src/modules/special/router/special.router.js';
//create server
const app = express();
const port =process.env.PORT || 3000;
app.use(express.json());
connectDB()
app.use('/users',userRouter)
app.use('/cars',carRouter)
app.use('/rental',rentalRouter)
app.use('/special',specialRouter)
// listen server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});