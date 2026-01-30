const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');

// Get portfolio
router.get('/', authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user_id: req.user.user_id }).populate('holdings.bond_id');
    
    if (!portfolio) {
      portfolio = await Portfolio.create({ user_id: req.user.user_id });
    }
    
    res.json({ success: true, portfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get holdings
router.get('/holdings', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user_id: req.user.user_id }).populate('holdings.bond_id');
    res.json({ success: true, holdings: portfolio?.holdings || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get performance
router.get('/performance', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user_id: req.user.user_id });
    
    res.json({
      success: true,
      performance: {
        total_value: portfolio?.total_value || 0,
        total_invested: portfolio?.total_invested || 0,
        gains: portfolio?.current_gains || 0,
        gain_percentage: portfolio?.total_invested ? ((portfolio.current_gains / portfolio.total_invested) * 100) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
