# Quick Reference Guide

## Command Quick Start

### 🚀 Start Everything (First Time)

```bash
# Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Seed database with demo data
cd backend && npm run seed

# Start services (in separate terminals)
Terminal 1: mongod --dbpath ./mongodb/data
Terminal 2: cd backend && npm run dev
Terminal 3: cd frontend && npm run dev
```

### 🐳 Docker Quick Start

```bash
docker-compose up -d
# Access: http://localhost:3000
```

### 🧪 Test the App

```bash
# Login with
Email: premium@bondplatform.demo
Password: Premium@CIH2026

# Then:
1. Go to /bonds - browse available bonds
2. Click a bond - see details and AI score
3. Click "View Details" - execute paper trade
4. Go to /dashboard - see portfolio update in real-time
```

## File Locations Reference

### Backend Files
```
backend/
├── src/server.js          # Main Express server
├── src/models/
│   ├── User.js            # User schema
│   ├── Bond.js            # Bond schema
│   ├── Transaction.js     # Transaction schema
│   └── Portfolio.js       # Portfolio schema
├── src/routes/
│   ├── auth.js            # Auth endpoints
│   ├── bonds.js           # Bond endpoints
│   ├── trading.js         # Trading endpoints
│   ├── portfolio.js       # Portfolio endpoints
│   └── users.js           # User endpoints
├── src/middleware/
│   ├── auth.js            # JWT middleware
│   ├── errorHandler.js    # Error handling
│   ├── logger.js          # Request logging
│   └── rateLimiter.js     # Rate limiting
└── .env                   # Configuration
```

### Frontend Files
```
frontend/
├── src/app/
│   ├── page.tsx           # Landing page
│   ├── login/page.tsx     # Login page
│   ├── signup/page.tsx    # Signup page
│   ├── dashboard/page.tsx # Dashboard
│   ├── bonds/page.tsx     # Bonds list
│   └── layout.tsx         # Root layout
├── src/services/
│   ├── api.ts             # API client
│   └── socket.ts          # WebSocket
├── src/styles/
│   └── globals.css        # Tailwind styles
├── next.config.js         # Next.js config
├── tailwind.config.ts     # Tailwind config
└── .env.local             # Environment
```

### Blockchain Files
```
blockchain/
├── contracts/
│   ├── BondToken.sol      # ERC20 token
│   └── BondMarketplace.sol # Marketplace
├── scripts/
│   └── deploy.js          # Deployment script
└── package.json
```

## API Endpoints Reference

### Authentication
```
POST /api/v1/auth/register
POST /api/v1/auth/login
GET /api/v1/auth/profile
```

### Bonds
```
GET /api/v1/bonds           # List bonds
GET /api/v1/bonds/:id       # Get bond details
GET /api/v1/bonds/:id/analytics  # Get analytics
POST /api/v1/bonds          # Create bond (admin)
```

### Trading
```
POST /api/v1/trading/buy    # Buy bonds
GET /api/v1/trading         # Get trade history
```

### Portfolio
```
GET /api/v1/portfolio       # Get portfolio
GET /api/v1/portfolio/performance  # Get performance
```

## Demo Data

### Sample Bonds (6 total)
```
1. NHAI Bond - 7.5% coupon, Low risk, 8.5/10 score
2. Mumbai Port - 8.0% coupon, Low risk, 8.7/10 score
3. Power Grid - 6.8% coupon, Low risk, 8.3/10 score
4. Railway - 7.2% coupon, Medium risk, 7.9/10 score
5. Water Board - 7.8% coupon, Medium risk, 7.6/10 score
6. Roads & Highways - 8.5% coupon, Medium risk, 7.4/10 score
```

### Demo Users (4 total)
```
Admin: admin@bondplatform.demo / Admin@CIH2026
Premium: premium@bondplatform.demo / Premium@CIH2026
Basic: basic@bondplatform.demo / Basic@CIH2026
Free: free@bondplatform.demo / Free@CIH2026
```

## Ports

```
Frontend:   3000  (Next.js)
Backend:    3210  (Express API)
MongoDB:    27017 (Database)
Redis:      6379  (Cache)
WebSocket:  3210  (Same as backend)
```

## Environment Variables

**Backend (.env)**
```
NODE_ENV=development
PORT=3210
MONGODB_URI=mongodb://localhost:27017/bond_platform
REDIS_URL=redis://localhost:6379
JWT_SECRET=<32+ char secret>
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3210/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:3210
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Run `mongod --dbpath ./mongodb/data` |
| Port 3210 in use | Kill process: `lsof -i :3210 && kill -9 <PID>` |
| Port 3000 in use | Kill process: `lsof -i :3000 && kill -9 <PID>` |
| Redis connection failed | Run `redis-server` or use Docker |
| npm modules issue | Delete node_modules and package-lock.json, then `npm install` |
| WebSocket not connecting | Verify backend is running and CORS is configured |

## Build & Deployment

### Build for Production
```bash
# Frontend
cd frontend && npm run build && npm start

# Backend
cd backend && npm start
```

### Docker Build
```bash
docker build -f backend/Dockerfile -t bond-backend:latest ./backend
docker build -f frontend/Dockerfile -t bond-frontend:latest ./frontend
docker-compose up
```

## Testing Checklist

- [ ] User signup works
- [ ] User login works
- [ ] KYC submission works
- [ ] Bond list loads
- [ ] Bond filtering works
- [ ] Bond details load
- [ ] Paper trade executes
- [ ] Portfolio updates
- [ ] WebSocket real-time updates
- [ ] Admin bond creation works
- [ ] Logout clears tokens
- [ ] Responsive on mobile

## Performance Targets

```
API Response:     < 200ms (p95)
Page Load:        < 2s (FCP)
WebSocket:        < 100ms
Database Query:   < 50ms
```

## Security Checklist

- [x] JWT authentication enabled
- [x] bcrypt password hashing
- [x] CORS configured
- [x] Rate limiting active
- [x] Error handling in place
- [x] Sensitive data protected
- [x] SQL injection prevention (MongoDB)
- [x] XSS prevention (React escaping)

## Useful Commands

```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Access database
mongo
use bond_platform
db.users.find()

# Check ports
lsof -i :3000
lsof -i :3210
lsof -i :27017

# Kill processes
kill -9 <PID>

# Clean slate
docker-compose down -v
rm -rf node_modules
npm install
```

## Documentation Files

- `README.md` - Full project overview
- `SETUP.md` - Step-by-step setup guide
- `DEMO.md` - Demo walkthrough script
- `BUILD_SUMMARY.md` - What was built
- `BLOCKCHAIN.md` - Smart contract docs

## Support

Check individual README/docs files for detailed info on each component.

---

**Last Updated**: January 30, 2026  
**Status**: ✅ Ready for Demo
