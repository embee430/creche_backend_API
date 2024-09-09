const express = require('express');
const router = express.Router();
const { Child } = require('../models');

// Create a new child
router.post('/', async (req, res) => {
  try {
    const child = await Child.create(req.body);
    res.status(201).json(child);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all children
router.get('/', async (req, res) => {
  try {
    const children = await Child.findAll();
    res.status(200).json(children);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a child by ID
router.get('/:id', async (req, res) => {
  try {
    const child = await Child.findByPk(req.params.id);
    if (child) {
      res.status(200).json(child);
    } else {
      res.status(404).json({ error: 'Child not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a child
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Child.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedChild = await Child.findByPk(req.params.id);
      res.status(200).json(updatedChild);
    } else {
      res.status(404).json({ error: 'Child not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a child
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Child.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Child not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
