const express = require('express');
const router = express.Router();
const { Role } = require('../models');

// Create a new role
router.post('/', async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a role
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Role.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRole = await Role.findByPk(req.params.id);
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a role
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Role.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
