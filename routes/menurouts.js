const express = require('express')
const router = express.Router();
const Menu=require('../Menu');

router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new Menu(data); // Correct `Menu` usage
  
      // Save the menu item
      const savedMenu = await newMenu.save();
  
      console.log('Menu item saved successfully');
      res.status(200).json(savedMenu);
    } catch (error) {
      console.error('Error saving menu item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      // Fetch all persons from the database
      const data = await Menu.find();
  
      if (data.length === 0) {
        console.log('No data found');
        return res.status(204).json({ message: 'No persons found' });
      }
  
      console.log('Data fetched successfully');
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching persons:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  router.get('/:workType', async (req, res) => {
    try {
      const workType = req.params.workType;
  
      
      const validWorkTypes = ['sweet', 'spicy', 'sour'];
  
     
      if (validWorkTypes.includes(workType)) {
          const response = await Menu.find({ taste: workType }); // Ensure the field matches your schema
  
        console.log('Response fetched:', response);
        return res.status(200).json(response);
      } else {
          return res.status(404).json({ error: 'Invalid work type' });
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract person ID from request params
      const updatedPersonData = req.body; // Extract data to update from request body
  
      // Find and update the person
      const response = await Menu.findByIdAndUpdate(
        personId,
        updatedPersonData,
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure schema validation
        }
      );
  
      // Handle case where person is not found
      if (!response) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      console.log('Person updated:', response);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error updating person:', error);
  
      // Handle specific errors (e.g., invalid ID format)
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).json({ error: 'Invalid person ID' });
      }
  
      // General error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const respons = await Menu.findByIdAndDelete(personId);

        if (!respons) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        console.log('Data deleted');
        res.status(200).json({ message: 'Menu deleted successfully' });
    } catch (error) {
        console.error('Error deleting Menu:', error);

        // Handle specific errors (e.g., invalid ID format)
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid person ID format' });
        }

        // General error response
        res.status(500).json({ error: 'Internal server error' });
    }
});


  module.exports=router;
