# 📓 Dev Diary: Mongo Database setup and adding some basic routes for authentication

## 🎯 Overview

Connect the Node.js/Express backend to a MongoDB database and define the data structure for users using Mongoose.

## ☁️ MongoDB Atlas Configuration
Before writing code, I set up the cloud infrastructure to host the data:

1. **Cluster Creation**: Deployed a free shared cluster (M0) on MongoDB Atlas.

1. **Network Access**: Whitelisted my current IP address to allow the backend to communicate with the cluster.

1. **Database User**: Created a dedicated database user with readWrite permissions.

1. **Connection String**: Obtained the mongodb+srv URI and updated the placeholder with the user password and the target database name (auth_db).

## ⚙️ Implementation Steps

1. **Dependency Injection** 📦

Installed the necessary packages in the `apps/backend` workspace:

- `mongoose`: For object data modeling (ODM).
- `dotenv`: To securely manage the Atlas connection string.

2. **Environment Security** 🔑

Created a .env file inside apps/backend. This file is excluded from git to protect the database credentials.

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth_db?retryWrites=true&w=majority
PORT=3001
```

3. **Connection Logic** 🔗

Developed a reusable connectDB module. I implemented a try/catch block with process.exit(1) to ensure the server crashes immediately if the database is unreachable, preventing "zombie" states.

4. **Server Integration** 🚀

Updated the backend entry point (index.ts) to initialize the database connection before the Express server starts listening for requests.

5. **Data Modeling (Schema & Model)** 🏗️

I defined the User Schema in `apps/backend/models/user.model.ts`. This serves as the blueprint for how user data is stored in MongoDB.

Key Schema Fields:
- Identity: email (unique, required) and password (required).
- Profile: name (required).
- Auth State: lastLogin (Date) and isVerified (Boolean, default: false).
- Security Tokens:
  - resetPasswordToken & resetPasswordExpiresAt
  - verificationToken & verificationTokenExpiresAt

## 💡 Lessons Learned & Troubleshooting

- **Fail-Fast Pattern**: Learned that stopping the process on a connection error is safer than letting the app run without a functional database.

- **URI Formatting**: Discovered that adding the database name (e.g., /auth_db) directly into the connection string automatically creates that specific database upon the first write.

- **ESM Compatibility**: Since my backend uses "type": "module", I ensured that internal imports (like ./db/connectDB.js) include the .js extension, even though the file is written in TypeScript.