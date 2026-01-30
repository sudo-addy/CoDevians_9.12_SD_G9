const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

// Get profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      req.body,
      { new: true }
    );
    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit KYC
router.post('/kyc', authMiddleware, async (req, res) => {
  try {
    const { document } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      {
        kyc_documents: [document],
        kyc_status: 'verified' // Auto-approved for demo
      },
      { new: true }
    );
    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
