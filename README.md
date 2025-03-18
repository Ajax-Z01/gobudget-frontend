# GoBudget Frontend

GoBudget is a personal finance management application designed to help users track expenses, set budgets, and gain financial insights. This repository contains the frontend of GoBudget, built with **Next.js (App Router)** and styled with **Tailwind CSS**.

## 🚀 Features
- **Expense Tracking**: Log and categorize your expenses easily.
- **Budgeting Tools**: Set budgets for different categories and track progress.
- **Reports & Insights**: Visualize spending trends with charts.
- **Dark/Light Mode**: Toggle between themes.
- **Data Export**: Download financial data for external analysis.
- **Authentication**: (Planned, using JWT/Auth provider)

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **State Management**: React Hooks
- **Charts & Graphs**: Recharts
- **Backend API**: GoBudget Backend (built with Golang & PostgreSQL)

## 📂 Project Structure
```
/gobudget-frontend
│── app/          # Next.js App Router structure
│── components/   # Reusable UI components
│── lib/          # Utility functions & API calls
│── utils/        # Helper functions
│── types/        # Type definitions
│── services/     # API service handlers
│── middleware.ts # Middleware logic
│── package.json  # Dependencies & scripts
```

## ⚡ Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Ajax-Z01/gobudget-frontend.git
cd gobudget-frontend
```

### 2️⃣ Install Dependencies
```sh
yarn install  # or npm install
```

### 3️⃣ Run the Development Server
```sh
yarn dev  # or npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Contribution
We welcome contributions! Feel free to fork this repository and submit a pull request with your improvements.

## 📜 License
This project is licensed under the MIT License.

---
🔗 **GoBudget Backend Repository**: [GoBudget-Backend](https://github.com/Ajax-Z01/gobudget-backend)

