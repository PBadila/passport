var express = require('express');
var router = express.Router();

const { Basket, BasketItem, Item, User, Order} = require('../models');



// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    //const orders = await Order.findAll({include:[ {model:Basket, through:OrderBaskets}, User  ]}); // how can we include the ITEMS associated with the baskets in this response?
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

// Get a specific order by ID, including associated baskets and users
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    //const order = await Order.findByPk(req.params.id, {include: [{model:Basket, through:OrderBaskets}, User]}); // how can we include the ITEMS associated with the baskets in this response?

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

// Update an user by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});
module.exports = router;