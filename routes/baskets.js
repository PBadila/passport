const express = require('express')
const router = express.Router();

//adds the authentication to the route
const { authenticate } = require("../middlewares/auth")


//Add resource-specific routes here

//this line imports 3 objects from the models module using DESTRUCTURING ASSIGNMENT so that they can be used in the current code file. Imports like this serve to make these objects and everything that is defined with them (their properties and methods) available to the code in this file - so if we were to reference the Basket object without this import, when we run it, the system would be like THIS IS UNDEFINED
const { Basket, BasketItem, Item } = require('../models')


// Create a new basket using the BASKET model/class and the data provided in the request body
router.post("/", authenticate, async (req, res) => {
//router.post('/', async (req, res) => { //route handler definition for the HTTP POST method with endpoint / , everything in the {} is our asynchronous function that takes in 2 parameters, req (request) and res (response) -- an asynchronous funtion is a non-blocking execution of code that enables JavaScript to perform multiple tasks without blocking the rest of the code, vs code being executed synchronously, where it waits for each operation to complete before moving on to the next one 
    try {
      const basket = await Basket.create(req.body);
      //creates a new basket using the Basket model CLASS (remember classes???) and based on the data in the req.body object (the info the user entered in)...AWAIT is used to wait for the create method to complete before moving to the next line

    console.log('Posting')
      res.status(201).json(basket);
      //if successful, response status code is 201 for CREATED and the created basket object is sent back to the client as a JSON response

    } catch (error) {
      res.status(500).json({ message: 'Error creating basket', error });
    }
    //The try catch block is used to handle errors that may occur during the execution of the code --> try: do this if successful and catch: do this if an error occurs
  });
//})


  // Get all baskets, including associated items
router.get('/', async (req, res) => {
    try {

        const baskets = await Basket.findAll()
    //   const baskets = await Basket.findAll(
    //     {include: 
    //         [{model: Item, through: BasketItem} ]
    //     }); 
        
   
    console.log('get baskets')
      //this line retrieves all the baskets from the database using the FINDALL() method of the BASKET class

      // how can we include the ITEMS associated with the baskets in this response? WITH INCLUDE

      res.json(baskets);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving baskets', error });
    }
  });


  // Get a specific basket by ID, including associated items
router.get('/:id', async (req, res) => {
    try {
        const basket = await Basket.findByPk(req.params.id)
    //   const basket = await Basket.findByPk(req.params.id, {include: [{model:Item, through: BasketItem}]}); // how can we include the ITEMS associated with the baskets in this response? WITH INCLUDE
  
      if (!basket) {
        res.status(404).json({ message: 'Basket not found' });
      } else {
        res.json(basket);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving basket', error });
    }
  });

  // Update a basket by ID
router.put("/:id", authenticate, async (req, res) => {
//router.put('/:id', async (req, res) => {
    try {
      const [updated] = await Basket.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (updated) {
        const updatedBasket = await Basket.findByPk(req.params.id);
        res.json(updatedBasket);
      } else {
        res.status(404).json({ message: 'Basket not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating basket', error });
    }
  });

  // Delete a basket by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
      const deleted = await Basket.destroy({
        where: { id: req.params.id },
      });
  
      if (deleted) {
        res.status(204).json({ message: 'Basket deleted' });
      } else {
        res.status(404).json({ message: 'Basket not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting basket', error });
    }
  });




module.exports = router;


