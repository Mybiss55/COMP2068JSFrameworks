// router names are in plural form
// CRUD operations are in singular form
// Create, Read, Update, Delete
// Import express
var express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import the Order model
const Item = require('../models/item'); // Import the Item model
const item = require('../models/item');
router.get('/', async (req, res, next) => { 
    let orders = await Order.find().sort([[ 'created', "ascending" ]]);
    res.render('orders/index', { title: 'All Orders', order: orders});
});
router.get('/items', async (req, res, next) => {
    let items = await Item.find().sort([[ 'name', "ascending" ]]);
    res.render('orders/items', { title: 'All Items', item: items})
});

router.get('/add', async (req, res, next) => { 
    let itemList = await Item.find().sort([[ 'name', "ascending" ]]);
    res.render('orders/add', { title: 'Add a Order', items: itemList});
});
router.get('/addItems', (req, res, next) => {
    res.render('orders/addItems', { title: 'Add a Item' });
});

// POST
router.post('/add', async (req, res, next) => {
    // Extract the request body
    const { name, totalPrice, items, status } = req.body;
    // Create a new order object
    const addOrder = new Order({
        name: req.body.name,
        totalPrice: req.body.totalPrice,
        items: req.body.items,
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
    let orderId = req.params._id;
    await Order.deleteOne({ _id: orderId });
    res.redirect('/orders');
});

// GET /deleteItem/:id - delete item
router.get('/deleteItem/:_id', async (req, res, next) => {
    let itemId = req.params._id;
    await Item.deleteOne({ _id: itemId });
    res.redirect('/orders/items');
});

// GET /edit/:id - edit order
router.get('/edit/:_id', async (req, res, next) => {
    let orderId = req.params._id;
    let orderData = await Order.findById(orderId);
    let itemsList = await Item.find().sort([[ 'name', "ascending" ]]);
    res.render('orders/edit', { title: 'Edit Order', order: orderData, items: itemsList });
});
// Handle Save Post  
router.post('/edit/:_id', async (req, res, next) => {
    let orderId = req.params._id;
    await Order.findByIdAndUpdate(
        {_id: orderId},
        {
            name: req.body.name,
            dueDate: req.body.dueDate,
            item: req.body.item,
            status: req.body.status,
        }); // Contains the fields to update
    res.redirect('/orders');
});

// GET /editItem/:id - edit item
router.get('/editItem/:_id', async (req, res, next) => {
    let itemId = req.params._id;
    let itemData = await Item.findById(itemId);
    res.render('orders/editItems', { title: 'Edit Item', item: itemData });
});
// Handle Save Post
router.post('/editItem/:_id', async (req, res, next) => {
    let itemId = req.params._id;
    await Item.findByIdAndUpdate(
        {_id: itemId},
        {
            name: req.body.name,
            ingredients: req.body.ingredients,
            price: req.body.price,
        }); // Contains the fields to update
    res.redirect('/orders/items');
});

// Export the router  object 
module.exports = router;