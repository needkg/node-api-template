# 🚀 Node.js API Template

> **A production-ready REST API foundation built with Node.js, Express, and MySQL**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/needkg/node-api-template.git
cd node-api-template
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run dev
```

**📚 [Complete Setup Guide →](../../wiki/Installation-Guide)** *(Coming Soon)*

## ✨ Features

- 🔐 **JWT Authentication** with refresh tokens
- 👥 **User Management** with role-based access
- 🛡️ **Security First** - bcrypt, prepared statements, CORS
- 🏗️ **Modular Architecture** - clean, maintainable code
- 🗄️ **MySQL Integration** - connection pooling & auto-setup
- 🔄 **Hot Reload** - fast development with nodemon

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

**📡 [Complete API Reference →](../../wiki/API-Endpoints)**

## 📚 Documentation

**Visit our [Wiki](../../wiki) for comprehensive guides:**

- 🔧 **[Installation Guide](../../wiki/Installation-Guide)** - Detailed setup instructions *(Coming Soon)*
- 📊 **[Project Overview](../../wiki/Project-Overview)** - Architecture and design decisions *(Coming Soon)*
- 📡 **[API Endpoints](../../wiki/API-Endpoints)** - Complete endpoint documentation

## 🛡️ Security

- ✅ **Password Hashing** with bcrypt
- ✅ **JWT Tokens** for stateless authentication
- ✅ **SQL Injection Protection** with prepared statements
- ✅ **Role-based Access Control**
- ✅ **Secure Cookie Handling**

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for developers who value security, scalability, and clean code.**