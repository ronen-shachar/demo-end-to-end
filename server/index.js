const express = require('express');
const cors = require('cors');
const db = require('./db')
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// GET all cars
app.get('/api/teslas', async (req, res) => {
    try {
        const cars = await db.getCars()
        res.send(cars);
    } catch(error) {
        res.status(500).send()
    }
});

// GET car by id
app.get('/api/teslas/:id', async(req, res) => {
    try {
        const car = await db.getCarById(req.params.id)
        if (!car) return res.status(404).send();
        res.send(car);
    res.send(car);
    } catch(error) {
        res.status(500).send()
    }
});

// POST a new car
app.post('/api/teslas', async(req, res) => {
    try {
        const car = await db.createCar(req.body)
        res.status(201).send(car);
    } catch(error) {
        res.status(500).send()
    }
});

// PUT (update) a car by id
app.put('/api/teslas/:id', async(req, res) => {
    try {
        const result = await db.updateCarName(req.params.id, req.body.name)
        if (!result) return res.status(404).send();
        res.status(204).send();
    } catch(error) {
        console.log(error);
        res.status(500).send()
    }
});

// DELETE a car by id
app.delete('/api/teslas/:id', async(req, res) => {
    try {
        const result = await db.deleteCar(req.params.id)
        if (!result) return res.status(404).send();
        res.status(204).send();
    } catch(error) {
        console.log(error);
        res.status(500).send()
    }
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
