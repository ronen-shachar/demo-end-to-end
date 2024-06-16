const express = require('express');
const cors = require('cors');
const db = require('./db')

const app = express();

/**
 * Middleware to parse incoming JSON data in the request body.
 * This middleware is used to parse any JSON data that is sent in the request body,
 * making it available in the `req.body` object.
 */
app.use(express.json());

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS) for all routes.
 * This middleware allows the server to receive requests from any origin,
 * enabling cross-origin communication between the client and server.
 */
app.use(cors());

app.post('/login', async (req, res) => {
    try {
        if (authenticateUser(req.body.username, req.body.password)) {
            const userId = await db.getUserId(req.body.username);
            res.send({success: true, userId: userId });
        } else {
            res.send({success: false});
        }
    } catch (error) {
        res.status(500).send();
    }
});

app.get('/logout', (req, res) => {
  res.send('Logout successful');
});

// GET all cars
app.get('/api/teslas', async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log(`user id: ${userId}`);
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

function authenticateUser(username, password) {
    return username === 'admin' && password === '1';
}

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

