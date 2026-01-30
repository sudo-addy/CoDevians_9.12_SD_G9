# Setup Guide

## Local Development Setup (5 minutes)

### Step 1: Prerequisites
Install these first:
- **Node.js 18+**: [nodejs.org](https://nodejs.org)
- **MongoDB**: [mongodb.com/download](https://www.mongodb.com/try/download)
- **Git**: [git-scm.com](https://git-scm.com)

### Step 2: Clone & Install

```bash
# Clone the project
git clone https://github.com/Pusparaj99op/CIH3.0-SDG9.12.git
cd CoDevians_9.12_SDG9

# Install backend
cd backend
npm install
cd ..

# Install frontend
cd frontend
npm install
cd ..
```

### Step 3: Environment Variables

**Backend (.env)**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
NODE_ENV=development
PORT=3210
MONGODB_URI=mongodb://localhost:27017/bond_platform
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev_secret_key_32_chars_minimum_for_testing
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.local)**
```bash
cd frontend
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3210/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:3210
```

### Step 4: Start Services

**Terminal 1 - MongoDB**
```bash
mongod --dbpath /path/to/local/mongodb/data
```

**Terminal 2 - Backend**
```bash
cd backend
npm run seed    # Seed demo data
npm run dev     # Start backend
```

**Terminal 3 - Frontend**
```bash
cd frontend
npm run dev     # Start frontend
```

### Step 5: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3210/health
- **Admin**: [http://localhost:3000/admin](Admin)

### Step 6: Login with Demo Account

```
Email: premium@bondplatform.demo
Password: Premium@CIH2026
```

## Docker Setup (Alternative)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Troubleshooting

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
mongod --version

# Check connection
mongo
```

### Port Already in Use
```bash
# Backend (Port 3210)
lsof -i :3210
kill -9 <PID>

# Frontend (Port 3000)
lsof -i :3000
kill -9 <PID>
```

### Redis Connection Error
```bash
# Install Redis (macOS)
brew install redis
redis-server

# Or use Docker
docker run -d -p 6379:6379 redis:7-alpine
```

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Verify Setup

```bash
# Check backend
curl http://localhost:3210/health

# Should return: {"status":"ok","timestamp":"..."}

# Check MongoDB
mongo --eval "db.adminCommand('ping')"

# Should return: {"ok":1}
```

## Next Steps

1. ✅ Browse bonds at http://localhost:3000/bonds
2. ✅ Execute paper trade (virtual ₹10L balance)
3. ✅ View portfolio performance
4. ✅ Check real-time WebSocket updates
5. ✅ Test admin panel (create new bond)

## Need Help?

- Check backend logs: `docker logs bond-platform-backend`
- Check frontend console: Browser DevTools (F12)
- Review API responses: Network tab in DevTools
