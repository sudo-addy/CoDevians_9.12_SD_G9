const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');
const Bond = require('./src/models/Bond');
const Portfolio = require('./src/models/Portfolio');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bond_platform');
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Bond.deleteMany({});
    await Portfolio.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create demo users
    const users = await User.insertMany([
      {
        email: 'admin@bondplatform.demo',
        password: 'Admin@CIH2026',
        name: 'Admin User',
        kyc_status: 'verified',
        subscription_tier: 'enterprise',
        subscription_expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      },
      {
        email: 'premium@bondplatform.demo',
        password: 'Premium@CIH2026',
        name: 'Premium User',
        kyc_status: 'verified',
        subscription_tier: 'premium',
        subscription_expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      },
      {
        email: 'basic@bondplatform.demo',
        password: 'Basic@CIH2026',
        name: 'Basic User',
        kyc_status: 'verified',
        subscription_tier: 'basic'
      },
      {
        email: 'free@bondplatform.demo',
        password: 'Free@CIH2026',
        name: 'Free User',
        kyc_status: 'pending',
        subscription_tier: 'free'
      }
    ]);
    console.log(`✓ Created ${users.length} demo users`);

    // Create sample bonds
    const bonds = await Bond.insertMany([
      {
        bond_id: 'NHAI-2026-001',
        name: 'National Highway Bond 2026',
        issuer: 'NHAI',
        coupon_rate: 7.5,
        maturity_date: new Date('2031-12-31'),
        risk_category: 'low',
        expected_returns: 7.8,
        current_price: 100,
        units_available: 5000,
        sector: 'Transportation',
        ai_recommendation_score: 8.5
      },
      {
        bond_id: 'MP-2026-002',
        name: 'Mumbai Port Trust Bond 2026',
        issuer: 'Mumbai Port Trust',
        coupon_rate: 8.0,
        maturity_date: new Date('2031-06-30'),
        risk_category: 'low',
        expected_returns: 8.2,
        current_price: 100,
        units_available: 3000,
        sector: 'Ports & Shipping',
        ai_recommendation_score: 8.7
      },
      {
        bond_id: 'PG-2026-003',
        name: 'Power Grid Bond 2026',
        issuer: 'Power Grid Corporation',
        coupon_rate: 6.8,
        maturity_date: new Date('2036-12-31'),
        risk_category: 'low',
        expected_returns: 7.0,
        current_price: 100,
        units_available: 7000,
        sector: 'Power & Energy',
        ai_recommendation_score: 8.3
      },
      {
        bond_id: 'RW-2026-004',
        name: 'Railway Bond 2026',
        issuer: 'Ministry of Railways',
        coupon_rate: 7.2,
        maturity_date: new Date('2031-03-31'),
        risk_category: 'medium',
        expected_returns: 7.5,
        current_price: 100,
        units_available: 4000,
        sector: 'Transportation',
        ai_recommendation_score: 7.9
      },
      {
        bond_id: 'WB-2026-005',
        name: 'Water Board Bond 2026',
        issuer: 'State Water Board',
        coupon_rate: 7.8,
        maturity_date: new Date('2028-12-31'),
        risk_category: 'medium',
        expected_returns: 8.0,
        current_price: 100,
        units_available: 2500,
        sector: 'Utilities',
        ai_recommendation_score: 7.6
      },
      {
        bond_id: 'RR-2026-006',
        name: 'Roads & Highways Bond 2026',
        issuer: 'State Highway Authority',
        coupon_rate: 8.5,
        maturity_date: new Date('2030-12-31'),
        risk_category: 'medium',
        expected_returns: 8.8,
        current_price: 100,
        units_available: 2000,
        sector: 'Transportation',
        ai_recommendation_score: 7.4
      }
    ]);
    console.log(`✓ Created ${bonds.length} sample bonds`);

    // Create portfolios for users
    const portfolios = await Portfolio.insertMany([
      {
        user_id: users[1]._id, // Premium user
        virtual_balance: 800000,
        total_invested: 200000
      },
      {
        user_id: users[2]._id, // Basic user
        virtual_balance: 950000,
        total_invested: 50000
      },
      {
        user_id: users[3]._id, // Free user
        virtual_balance: 1000000
      }
    ]);
    console.log(`✓ Created ${portfolios.length} portfolios`);

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\nDemo Credentials:');
    console.log('Admin: admin@bondplatform.demo / Admin@CIH2026');
    console.log('Premium: premium@bondplatform.demo / Premium@CIH2026');
    console.log('Basic: basic@bondplatform.demo / Basic@CIH2026');
    console.log('Free: free@bondplatform.demo / Free@CIH2026');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
