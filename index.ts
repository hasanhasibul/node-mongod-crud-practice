
import mongoose from 'mongoose';
import app from './app';
const port: number = 5000
const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/practice-crud');
        console.log("DB connection succesful")
        app.listen(port, () => { console.log('Listening Port of ', port) })
    } catch (error) {
        console.log("DB connection error", error)
    }
}
dbConnection()


