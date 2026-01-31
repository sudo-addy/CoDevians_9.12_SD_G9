const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { authMiddleware } = require('../middleware/auth');

// Submit contact form (public endpoint)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, category } = req.body;

    // Input validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Name, email, subject, and message are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Message length validation
    if (message.length < 10) {
      return res.status(400).json({
        error: 'Message must be at least 10 characters'
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        error: 'Message cannot exceed 5000 characters'
      });
    }

    // Create contact submission
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      category: category || 'general',
      ip_address: req.ip || req.connection?.remoteAddress,
      user_agent: req.get('User-Agent')
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully. We will get back to you within 24-48 hours.',
      ticket_id: contact._id
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Get all contacts (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const contacts = await Contact.find(filter)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contact by ID (admin only)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update contact status (admin only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, priority, response } = req.body;

    const updateData = { updated_at: new Date() };
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (response) {
      updateData.response = {
        message: response,
        responded_at: new Date(),
        responded_by: req.user?.user_id
      };
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
