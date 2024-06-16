const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dbName = 'teslaDB'

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/' + dbName);
        // use the operations here to test
    } catch (error) {
        console.error(error)
    }
}

const carSchema = new Schema({
    name: String,
    imgSrc: String
})

const userSchema = new Schema({
    username: String,
    password: String
})

const Car = mongoose.model('cars', carSchema)
const User = mongoose.model('users', userSchema)

async function getCars() {
    const result = await Car.find()
    return result
}

async function getCarById(carId) {
    const result = await Car.findOne({_id: carId})
    return result
}

async function createCar(newCar) {
    const result = await Car.create(newCar)
    return result
}

async function updateCarName(carId, newName) {
    const result = await Car.updateOne({_id: carId}, {$set: {name: newName}})
    return result.modifiedCount === 1;
}

async function deleteCar(carId) {
    const result = await Car.deleteOne({_id: carId});
    return result.deletedCount === 1;
}

async function getUserId(username) {
    const result = await User.findOne({username: username})
    return "99" // result._id
}

main()

module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCarName,
    deleteCar,
    getUserId
}