# Windows Setup Guide (No Docker)

Since Docker is not installed, you need to set up the dependencies manually.

## 1. Install Node.js Dependencies
(I can do this for you, just say "Yes")
- `cd backend && npm install`
- `cd frontend && npm install`

## 2. Install MongoDB (Database)
The backend requires a running MongoDB instance.
- **Download**: [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **Install**: Run the MSI installer. Ensure "Install MongoDB as a Service" is checked.
- **Start**: It should start automatically. Verify by opening a terminal and typing `mongod --version`.

## 3. Install Redis (Cache)
The backend requires a running Redis instance.
- **Option A (Easy)**: Install [Memurai Developer Edition](https://www.memurai.com/get-memurai) (Redis compatible for Windows).
- **Option B (WSL)**: If you use WSL (Ubuntu on Windows), run:
  ```bash
  sudo apt install redis-server
  sudo service redis-server start
  ```

## 4. Run the Project
Once the above are installed:
1.  Open Terminal 1: `cd backend && npm run dev`
2.  Open Terminal 2: `cd frontend && npm run dev`

The app will be available at imports `http://localhost:3000`.
