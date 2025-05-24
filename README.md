# Lanchain 🧠📋

Lanchain is a task management system built with Node.js and MongoDB, designed to help users organize, track, and manage their work efficiently. The system provides simple RESTful APIs to create, retrieve, and manage tasks with useful features like timestamps and soft deletion.

## 🚀 Features

- ✅ Create, read, and list tasks
- 🕒 Track start and finish times
- ✍️ Store detailed task content
- 🗃️ Soft delete functionality (mark as deleted without removing from DB)
- ⏱️ Automatic timestamping with `createdAt` and `updatedAt`

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Runtime**: Nodemon for development
- **Environment Config**: dotenv

## 📂 Project Structure

```
Lanchain/
├── config/
│   └── database.js
├── models/
│   └── task.model.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## 📦 Installation

```bash
git clone https://github.com/your-username/Lanchain.git
cd Lanchain
yarn install
document https://docs.google.com/document/d/1NTRWlXxoK1JL9L2Ua-jmVE_m2xhDU3mNeLW-LNirMkA/edit?usp=sharing
```

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```
PORT=8686
MONGO_URL=your_mongo_connection_string
```

## 🚀 Run the Server

```bash
yarn dev
```

Or manually:

```bash
node index.js
```

## 📬 API Endpoints

- `GET /` — Health check
- `GET /tasks` — Get all non-deleted tasks

## 📄 License

This project is licensed under the MIT License.

---

Feel free to contribute or raise issues if you'd like to help improve Lanchain!
