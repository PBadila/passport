const express = require('express');
const router = express.Router();

//adds the authentication to the route
const { authenticate } = require("../middlewares/auth")

// Add your resource-specific routes here
const { Basket, BasketItem, Item, User, Order} = require('../models');

// Create a new order
router.post('/', authenticate, async (req, res) => {
  try {
    const order = await User.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// Get all orders, including associated baskets and users
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll()
    //const orders = await Order.findAll({include:[ {model:Basket, through:OrderBaskets}, User  ]}); // how can we include the ITEMS associated with the baskets in this response?
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
});

// Get a specific order by ID, including associated baskets and users
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id)
    //const order = await Order.findByPk(req.params.id, {include: [{model:Basket, through:OrderBaskets}, User]}); // how can we include the ITEMS associated with the baskets in this response?

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
});

// Update an order by ID
router.put('/:id', authenticate, async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedOrder = await Order.findByPk(req.params.id);
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});

// Delete an order by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).json({ message: 'Order deleted' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});
module.exports = router;