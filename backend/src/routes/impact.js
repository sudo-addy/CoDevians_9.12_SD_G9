const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Portfolio = require('../models/Portfolio');
const Bond = require('../models/Bond');
const User = require('../models/User');

// Get platform-wide impact metrics (public endpoint)
router.get('/metrics', async (req, res) => {
  try {
    // Get all completed transactions
    const transactions = await Transaction.find({
      status: { $in: ['confirmed', 'settled'] },
      type: 'buy'
    });

    // Calculate total invested across platform
    const totalInvested = transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);

    // Get unique investors count
    const uniqueInvestors = await User.countDocuments({ kyc_status: { $ne: 'rejected' } });

    // Get total bonds/projects
    const totalBonds = await Bond.countDocuments();

    // Get bonds by category for sector breakdown
    const bondsByCategory = await Bond.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: '$total_issue_size' }
        }
      }
    ]);

    // Calculate infrastructure impact metrics (simulated based on investment)
    const infrastructureImpact = {
      roads_km: Math.floor(totalInvested / 50000000) * 10, // 10km per ₹5Cr
      bridges: Math.floor(totalInvested / 100000000), // 1 bridge per ₹10Cr
      solar_mw: Math.floor(totalInvested / 25000000) * 5, // 5MW per ₹2.5Cr
      water_connections: Math.floor(totalInvested / 1000000) * 100, // 100 per ₹10L
      jobs_created: Math.floor(totalInvested / 500000) * 2, // 2 jobs per ₹5L
      co2_saved_tons: Math.floor(totalInvested / 10000000) * 50 // 50 tons per ₹1Cr
    };

    // SDG alignment scores
    const sdgAlignment = {
      sdg9: { score: 92, label: 'Industry, Innovation & Infrastructure' },
      sdg11: { score: 85, label: 'Sustainable Cities & Communities' },
      sdg13: { score: 78, label: 'Climate Action' },
      sdg7: { score: 72, label: 'Affordable & Clean Energy' },
      sdg8: { score: 68, label: 'Decent Work & Economic Growth' }
    };

    // Monthly investment trends (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyTrends = await Transaction.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'settled'] },
          type: 'buy',
          timestamp: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' }
          },
          totalAmount: { $sum: '$total_amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Format monthly trends
    const formattedTrends = monthlyTrends.map(item => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      amount: item.totalAmount,
      transactions: item.count
    }));

    // ESG scores
    const esgScores = {
      environmental: 82,
      social: 78,
      governance: 91,
      overall: 84
    };

    // Regional distribution (simulated)
    const regionalDistribution = [
      { region: 'North India', percentage: 28, amount: totalInvested * 0.28 },
      { region: 'South India', percentage: 32, amount: totalInvested * 0.32 },
      { region: 'West India', percentage: 24, amount: totalInvested * 0.24 },
      { region: 'East India', percentage: 16, amount: totalInvested * 0.16 }
    ];

    res.json({
      success: true,
      metrics: {
        overview: {
          totalInvested,
          uniqueInvestors,
          totalProjects: totalBonds,
          averageInvestment: uniqueInvestors > 0 ? totalInvested / uniqueInvestors : 0
        },
        infrastructureImpact,
        sdgAlignment,
        esgScores,
        sectorBreakdown: bondsByCategory,
        monthlyTrends: formattedTrends,
        regionalDistribution
      },
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Impact metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch impact metrics' });
  }
});

// Get impact metrics for a specific bond
router.get('/bond/:bondId', async (req, res) => {
  try {
    const { bondId } = req.params;

    const bond = await Bond.findById(bondId);
    if (!bond) {
      return res.status(404).json({ error: 'Bond not found' });
    }

    const transactions = await Transaction.find({
      bond_id: bondId,
      status: { $in: ['confirmed', 'settled'] },
      type: 'buy'
    });

    const totalRaised = transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
    const investorCount = new Set(transactions.map(t => t.user_id.toString())).size;

    // Calculate bond-specific impact based on category
    let impact = {};
    switch (bond.category?.toLowerCase()) {
      case 'green':
        impact = {
          co2_offset: Math.floor(totalRaised / 5000000) * 100,
          trees_equivalent: Math.floor(totalRaised / 100000) * 10,
          renewable_capacity_kw: Math.floor(totalRaised / 1000000) * 50
        };
        break;
      case 'infrastructure':
      case 'govt':
        impact = {
          jobs_created: Math.floor(totalRaised / 500000) * 3,
          families_benefited: Math.floor(totalRaised / 100000) * 5,
          infrastructure_score: Math.min(100, Math.floor(totalRaised / 10000000) * 10)
        };
        break;
      default:
        impact = {
          economic_contribution: totalRaised * 1.5,
          employment_potential: Math.floor(totalRaised / 1000000) * 2
        };
    }

    res.json({
      success: true,
      bondImpact: {
        bondId,
        bondName: bond.name,
        category: bond.category,
        totalRaised,
        targetAmount: bond.total_issue_size,
        progressPercent: bond.total_issue_size > 0
          ? Math.min(100, (totalRaised / bond.total_issue_size) * 100)
          : 0,
        investorCount,
        impact,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Bond impact error:', error);
    res.status(500).json({ error: 'Failed to fetch bond impact metrics' });
  }
});

module.exports = router;
