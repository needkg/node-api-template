# 🚀 Node.js API Template

A robust and scalable REST API built with Node.js, Express and MySQL, following architecture and security best practices.

## 🛠️ Technologies

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

- **Node.js** - JavaScript runtime
- **Express.js** - Minimalist web framework
- **MySQL2** - MySQL driver with promise support
- **JWT** - Token-based authentication
- **bcrypt** - Secure password hashing
- **dotenv** - Environment variables management
- **cookie-parser** - Cookie handling
- **nodemon** - Hot reload for development

## ✨ Features

- 🔐 **JWT Authentication** with refresh tokens
- 👥 **User system** with profiles and permissions
- 🛡️ **Security middleware** and authorization
- 🗄️ **MySQL integration** with connection pooling
- 🔧 **Automated initial setup**
- 📁 **Modular architecture** by features
- 🔄 **Hot reload** with nodemon
- 🍪 **Secure cookie management**

## 🏗️ Architecture

```
apps/api/src/
├── features/           # Feature-organized modules
│   ├── auth/          # Authentication and authorization
│   ├── users/         # User management
│   ├── admin/         # Administrative features
│   └── setup/         # Initial system setup
├── infra/             # Infrastructure and database
│   └── database/      # MySQL connection and configuration
├── shared/            # Shared resources
│   ├── auth/          # Authentication utilities (JWT, hash)
│   └── middlewares/   # Custom middlewares
├── app.js             # Express configuration
└── server.js          # Application entry point
```

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- MySQL or MariaDB
- npm or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd node-api-template
```

### 2. Install dependencies

```bash
cd apps/api
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit the `.env` file with your configurations:

```env
# JWT Secrets (use secure keys in production)
JWT_ACCESS_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key

# Application environment
NODE_ENV=development

# Server configuration
API_PORT=3000

# MySQL configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
DB_PORT=3306
```

### 4. Setup the database

Make sure MySQL is running and create the database:

```sql
CREATE DATABASE your_database_name;
```

### 5. Start the application

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 📋 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | User login | ❌ |
| `POST` | `/auth/refresh` | Refresh access token | ❌ |
| `POST` | `/auth/logout` | User logout | ❌ |

### 👤 Users

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/user/me` | Get user profile | ✅ |
| `PATCH` | `/user/me` | Update profile | ✅ |

### 👑 Administration

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/admin/users` | List all users | ✅ Admin |
| `PATCH` | `/admin/users/:userId` | Update user | ✅ Admin |

### ⚙️ Setup

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/setup/first-admin` | Create first administrator | ❌ |

## 🔒 Authentication System

### Authentication Flow

1. **Register/Login**: User registers or logs in
2. **JWT Tokens**: Receives access token (short duration) and refresh token (long duration)
3. **Authorization**: Access token is used to access protected resources
4. **Renewal**: Refresh token renews the access token when it expires

### Security Middlewares

- `ensureAuthenticated`: Verifies if user is authenticated
- `ensureUserActivated`: Verifies if user account is active
- `requireAdmin`: Verifies if user has administrative privileges
- `ensureAdminSetupPending`: Allows initial setup of first admin

## 🗄️ Database

The system uses MySQL with the following features:

- **Connection pooling** for better performance
- **Prepared statements** for SQL injection security
- **Automatic table setup** on initialization
- **System state** for configuration control

## 🔧 Available Scripts

```bash
# Development with hot reload
npm run dev
```

## 📦 API Response Structure

### Success
```json
{
  "status": 200,
  "message": "Success message"
}
```

### Error
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Error description"
}
```

## 🛡️ Security

- ✅ Bcrypt hashed passwords
- ✅ Secure JWT tokens
- ✅ Input validation
- ✅ Authorization middlewares
- ✅ Secure cookies
- ✅ Prepared statements (SQL injection protection)

## 🚀 Deploy

### Production Environment Variables

```env
NODE_ENV=production
JWT_ACCESS_SECRET=<strong-secret-key>
JWT_REFRESH_SECRET=<another-strong-secret-key>
API_PORT=3000
DB_HOST=<production-db-host>
DB_USER=<production-db-user>
DB_PASSWORD=<production-db-password>
DB_NAME=<production-db-name>
DB_PORT=3306
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license.

---

**Built with ❤️ using Node.js and Express**