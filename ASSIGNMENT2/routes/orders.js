// router names are in plural form
// CRUD operations are in singular form
// Create, Read, Update, Delete
// Import express
var express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import the Order model
const Item = require('../models/item'); // Import the Item model
router.get('/', async (req, res, next) => { 
    let orders = await Order.find().sort([[ 'created', "ascending" ]]);
    res.render('orders/index', { title: 'All Orders', order: orders});
});
router.get('/items', async (req, res, next) => {
    let items = await Item.find().sort([[ 'name', "ascending" ]]);
    res.render('orders/items', { title: 'All Items', item: items})
});

router.get('/add', async (req, res, next) => { 
    let coursesList = await Item.find().sort([[ 'name', "ascending" ]]);
    res.render('orders/add', { title: 'Add a Order', items: coursesList});
});
router.get('/addItems', (req, res, next) => {
    res.render('orders/addItems', { title: 'Add a Item' });
});

// POST
router.post('/add', async (req, res, next) => {
    // Extract the request body
    const { name, dueDate, item, status } = req.body;
    // Create a new order object
    const addOrder = new Order({
        name: req.body.name,
        dueDate: req.body.dueDate,
        item: req.body.item,
    });
    // Save the new order object
    await addOrder.save()
    .then(() => {
        res.redirect('/orders');
    })
    .catch(err => {
        console.error(`Error saving the order: ${err}`);
    });
});
router.post('/addItems', async (req, res, next) => {
    // Extract the request body
    const { name, code } = req.body;
    // Create a new item object
    const addItems = new Item({
        name: req.body.name,
        ingredients: req.body.ingredients,
        price: req.body.price,
    });
    // Save the new item object
    await addItems.save()
    .then(() => {
        res.redirect('/orders/items');
    })
    .catch(err => {
        console.error(`Error saving the item: ${err}`);
    });
});

// GET /delete/:id - delete order
router.get('/delete/:_id', async (req, res, next) => {
    let projectId = req.params._id;
    await Order.deleteOne({ _id: projectId });
    res.redirect('/orders');
});

// Handle Order Edit
router.get('/edit/:_id', async (req, res, next) => {
    let projectId = req.params._id;
    let projectData = await Order.findById(projectId);
    let coursesList = await Item.find().sort([[ 'name', "ascending" ]]);
    res.render('orders/edit', { title: 'Edit Order', order: projectData, items: coursesList });
});
// Handle Save Post  
router.post('/edit/:_id', async (req, res, next) => {
    let projectId = req.params._id;
    await Order.findByIdAndUpdate(
        {_id: projectId},
        {
            name: req.body.name,
            dueDate: req.body.dueDate,
            item: req.body.item,
            status: req.body.status,
        }); // Contains the fields to update
    res.redirect('/orders');
});

// Export the router  object 
module.exports = router;