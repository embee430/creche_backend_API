const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Sequelize } = require('../models');

// Login route
router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        // Find user by either email or username
        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Directly compare password (for demonstration only, not recommended for production)
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email, role: user.role },
            process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in your .env file
            { expiresIn: '1h' }
        );

        // Return token and user details
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
