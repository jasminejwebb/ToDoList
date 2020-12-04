const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/creativeProject4', {
    useNewUrlParser: true
});


// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
    title: String,
    category: String,
    date: Date,
    completed: Boolean, 
});

const categorySchema = new mongoose.Schema({
    category: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
const Category = mongoose.model('Category', categorySchema);


// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async(req, res) => {
    const item = new Item({
        title: req.body.title,
        category: req.body.category,
        date: req.body.date,
        completed: false,
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.post('/api/categories', async(req, res) => {
    const category = new Category({
        category: req.body.category,
    });
    try {
        await category.save();
        res.send(category);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.put('/api/completed/:id', async(req, res) => {
    try {
        await Item.updateOne({
            _id: req.params.id},
            { $set: {completed:true } 
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/uncompleted/:id', async(req, res) => {
    try {
        await Item.updateOne({
            _id: req.params.id},
            { $set: {completed:false } 
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async(req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/categories', async(req, res) => {
    try {
        let categories = await Category.find();
        res.send(categories);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/items/:id', async(req, res) => {
    try {
        await Item.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/categories/:id', async(req, res) => {
    try {
        await Category.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3005, () => console.log('Server listening on port 3005!'));