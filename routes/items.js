const express = require('express');
const router = express.Router();

// Add your resource-specific routes here
const { Basket, BasketItem, Item } = require('../models');

// Create a new item
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
});

// Get all items, including associated baskets
router.get('/', async (req, res) => {
  try {
    console.log('getting items')
    const items = await Item.findAll()
    //const items = await Item.findAll({include:{model:Basket, through:BasketItem}}); // how can we include the ITEMS associated with the baskets in this response?
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items', error });
  }
});

// Get a specific item by ID, including associated baskets
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id)
    //const item = await Item.findByPk(req.params.id, {include:[{model: Basket, through: BasketItem}]}); // how can we include the ITEMS associated with the baskets in this response?

    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json(item);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving item', error });
  }
});

// Update an item by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Item.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Item.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Item', error });
  }
});
module.exports = router;