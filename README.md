# 🚀 API Template - Node.js Express com Autenticação JWT

Um template completo e profissional de API REST construído com Node.js, Express e MySQL, incluindo sistema de autenticação JWT, gerenciamento de usuários, controle de acesso baseado em roles (admin/user) e setup inicial automatizado.

## 📋 Índice

- [Características](#-características)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Autenticação](#-autenticação)
- [Banco de Dados](#-banco-de-dados)
- [Uso](#-uso)
- [Desenvolvimento](#-desenvolvimento)
- [Segurança](#-segurança)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## ✨ Características

- ✅ **Autenticação JWT** - Sistema completo de autenticação com tokens JWT
- ✅ **Gerenciamento de Usuários** - CRUD completo de usuários
- ✅ **Controle de Acesso** - Sistema de roles (Admin/User) com middlewares
- ✅ **Setup Inicial** - Criação automática do primeiro usuário administrador
- ✅ **Arquitetura em Camadas** - Separação clara entre Controller, Service e Repository
- ✅ **Validação de Dados** - Validação de entrada em todos os endpoints
- ✅ **Tratamento de Erros** - Tratamento consistente de erros em toda aplicação
- ✅ **Pool de Conexões** - Gerenciamento eficiente de conexões com MySQL
- ✅ **Sistema de Estado** - Tabela `system_state` para controle de configurações
- ✅ **Ativação/Desativação de Usuários** - Controle de acesso por status de ativação

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas bem definida:

```
┌─────────────────┐
│   Routes        │  ← Definição das rotas HTTP
├─────────────────┤
│   Controller    │  ← Lógica de controle e validação de entrada
├─────────────────┤
│   Service       │  ← Regras de negócio
├─────────────────┤
│   Repository    │  ← Acesso aos dados (queries SQL)
├─────────────────┤
│   Database      │  ← MySQL Database
└─────────────────┘
```

### Middlewares

- **`ensureAuthenticated`** - Verifica se o usuário está autenticado via JWT
- **`ensureUserActivated`** - Verifica se o usuário está ativado
- **`requireAdmin`** - Verifica se o usuário tem permissões de administrador
- **`ensureAdminSetupPending`** - Garante que o setup inicial ainda não foi concluído

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL2** - Driver MySQL com suporte a Promises
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcrypt** - Hash de senhas
- **dotenv** - Gerenciamento de variáveis de ambiente
- **nodemon** - Desenvolvimento com hot-reload

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18 ou superior)
- **MySQL** (v8.0 ou superior)
- **npm** ou **yarn**

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd primeira-api
```

2. **Instale as dependências:**
```bash
cd apps/api
npm install
```

3. **Configure o banco de dados:**
   - Crie um banco de dados MySQL
   - Configure as variáveis de ambiente (veja seção [Configuração](#-configuração))

4. **Inicie o servidor:**
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000` (ou na porta definida em `API_PORT`).

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto `apps/api/` com as seguintes variáveis:

```env
# Servidor
API_PORT=3000

# Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=3306

# JWT
JWT_SECRET=seu_secret_jwt_super_seguro_aqui
```

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `API_PORT` | Porta do servidor | `3000` |
| `DB_HOST` | Host do MySQL | `localhost` |
| `DB_USER` | Usuário do MySQL | `root` |
| `DB_PASSWORD` | Senha do MySQL | `` |
| `DB_NAME` | Nome do banco de dados | `testdb` |
| `DB_PORT` | Porta do MySQL | `3306` |
| `JWT_SECRET` | Chave secreta para JWT | `dev-secret` |

⚠️ **Importante:** Em produção, use um `JWT_SECRET` forte e único!

## 📁 Estrutura do Projeto

```
apps/api/
├── src/
│   ├── app.js                    # Configuração do Express
│   ├── server.js                 # Inicialização do servidor
│   │
│   ├── features/                 # Módulos de funcionalidades
│   │   ├── auth/                 # Autenticação
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.repository.js
│   │   │   ├── auth.routes.js
│   │   │   └── services/
│   │   │       ├── password.service.js
│   │   │       └── token.service.js
│   │   │
│   │   ├── users/                # Gerenciamento de usuários
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.repository.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── admin/                # Funcionalidades administrativas
│   │   │   ├── admin.controller.js
│   │   │   ├── admin.service.js
│   │   │   ├── admin.repository.js
│   │   │   └── admin.routes.js
│   │   │
│   │   └── setup/                # Setup inicial
│   │       ├── setup.controller.js
│   │       ├── setup.service.js
│   │       ├── setup.repository.js
│   │       └── setup.routes.js
│   │
│   ├── infra/                    # Infraestrutura
│   │   └── database/
│   │       ├── connection.js     # Pool de conexões MySQL
│   │       ├── init.js           # Inicialização do banco
│   │       └── setup.js          # Criação de tabelas
│   │
│   └── shared/                    # Código compartilhado
│       └── middlewares/
│           ├── auth.middleware.js
│           ├── admin.middleware.js
│           ├── user.middleware.js
│           ├── setup.middleware.js
│           └── index.js
│
├── package.json
└── .env                          # Variáveis de ambiente (criar)
```

## 🔌 Endpoints da API

### Autenticação

#### `POST /auth/register`
Registra um novo usuário.

**Request Body:**
```json
{
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:** `204 No Content`

---

#### `POST /auth/login`
Autentica um usuário e retorna um token JWT.

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Usuário

#### `GET /user/profile`
Retorna o perfil do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "name": "João Silva",
    "email": "joao@example.com",
    "isActivated": true
  }
}
```

---

### Administração

#### `GET /admin/users`
Lista todos os usuários (apenas admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "rows": {
    "users": {
      "1": {
        "userId": "uuid-do-usuario",
        "name": "João Silva",
        "username": "joaosilva",
        "email": "joao@example.com",
        "isActivated": true,
        "isAdmin": false
      }
    }
  }
}
```

---

#### `PATCH /admin/user/:userId/desactivate`
Desativa um usuário (apenas admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `204 No Content`

---

#### `PATCH /admin/user/:userId/activete`
Ativa um usuário (apenas admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `204 No Content`

---

### Setup

#### `POST /setup/first-admin`
Cria o primeiro usuário administrador (disponível apenas antes do setup inicial).

**Request Body:**
```json
{
  "name": "Admin",
  "username": "admin",
  "email": "admin@example.com",
  "password": "senha123"
}
```

**Response:** `204 No Content`

⚠️ **Nota:** Este endpoint só funciona uma vez, antes do setup inicial ser concluído.

---

## 🔐 Autenticação

A API utiliza autenticação baseada em **JWT (JSON Web Tokens)**.

### Como usar:

1. **Faça login** usando `POST /auth/login` para obter um token
2. **Inclua o token** no header `Authorization` de todas as requisições protegidas:
   ```
   Authorization: Bearer <seu_token_aqui>
   ```

### Expiração do Token

Os tokens JWT expiram em **5 minutos** por padrão. Após a expiração, será necessário fazer login novamente.

### Fluxo de Autenticação

```
1. Cliente → POST /auth/login (email, password)
2. Servidor → Valida credenciais
3. Servidor → Retorna JWT token
4. Cliente → Usa token em requisições subsequentes
5. Servidor → Valida token via middleware
```

## 🗄️ Banco de Dados

### Estrutura das Tabelas

#### Tabela `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | ID auto-incrementável (chave primária) |
| `userId` | CHAR(36) | UUID único do usuário |
| `name` | VARCHAR(100) | Nome completo |
| `username` | VARCHAR(50) | Nome de usuário único |
| `email` | VARCHAR(150) | Email único |
| `password` | VARCHAR(255) | Senha hasheada (bcrypt) |
| `isActivated` | TINYINT(1) | Status de ativação (0 ou 1) |
| `isAdmin` | TINYINT(1) | Permissão de admin (0 ou 1) |
| `createdAt` | TIMESTAMP | Data de criação |
| `updatedAt` | TIMESTAMP | Data de atualização |

#### Tabela `system_state`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | ID auto-incrementável (chave primária) |
| `key` | VARCHAR(100) | Chave única do estado |
| `value` | VARCHAR(255) | Valor do estado |
| `type` | ENUM | Tipo do valor (string, number, boolean, json) |
| `description` | TEXT | Descrição do estado |
| `createdAt` | TIMESTAMP | Data de criação |
| `updatedAt` | TIMESTAMP | Data de atualização |

### Inicialização Automática

O banco de dados é inicializado automaticamente na primeira execução:

1. Criação das tabelas `users` e `system_state`
2. Inserção do estado inicial `setup.admin = 'pending'`

## 💻 Uso

### 1. Primeira Execução (Setup Inicial)

```bash
# 1. Configure o .env com suas credenciais do MySQL
# 2. Inicie o servidor
npm run dev

# 3. Crie o primeiro usuário administrador
curl -X POST http://localhost:3000/setup/first-admin \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "username": "admin",
    "email": "admin@example.com",
    "password": "senha123"
  }'
```

### 2. Registrar um Novo Usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "username": "joaosilva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### 3. Fazer Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### 4. Acessar Perfil (Autenticado)

```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer <seu_token_aqui>"
```

### 5. Listar Usuários (Admin)

```bash
curl -X GET http://localhost:3000/admin/users \
  -H "Authorization: Bearer <token_admin>"
```

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento com hot-reload
npm run dev
```

### Correções e Melhorias Aplicadas

Este template foi revisado e corrigido para garantir qualidade:

- ✅ **Correção de bugs no admin.controller.js** - Corrigidas chamadas recursivas nas funções `desactiveUser` e `activeUser`
- ✅ **Correção no admin.service.js** - Adicionado import correto de `updateUserActivation` do repository
- ✅ **Limpeza no app.js** - Removidas rotas duplicadas (`dbRoutes` e `databaseRoutes`)
- ✅ **Estrutura otimizada** - Código organizado seguindo boas práticas

### Padrões de Código

- **ES Modules** - Uso de `import/export` ao invés de `require/module.exports`
- **Async/Await** - Uso de async/await para operações assíncronas
- **Separação de Responsabilidades** - Controller → Service → Repository
- **Error Handling** - Tratamento consistente de erros em todas as camadas

### Adicionando Novas Features

1. Crie uma nova pasta em `src/features/`
2. Siga a estrutura: `controller.js`, `service.js`, `repository.js`, `routes.js`
3. Registre as rotas em `src/app.js`
4. Crie middlewares necessários em `src/shared/middlewares/`

## 🔒 Segurança

### Implementações de Segurança

- ✅ **Senhas Hasheadas** - Uso de bcrypt com salt rounds = 10
- ✅ **JWT Tokens** - Autenticação stateless segura
- ✅ **Validação de Entrada** - Validação de dados em todos os endpoints
- ✅ **Controle de Acesso** - Middlewares para verificação de permissões
- ✅ **Proteção de Rotas** - Rotas protegidas por autenticação
- ✅ **Prevenção de Auto-desativação** - Admins não podem desativar a si mesmos

### Recomendações para Produção

- [ ] Use HTTPS em produção
- [ ] Configure CORS adequadamente
- [ ] Implemente rate limiting
- [ ] Use variáveis de ambiente seguras
- [ ] Configure logs de segurança
- [ ] Implemente refresh tokens
- [ ] Adicione validação de email mais robusta
- [ ] Configure backup automático do banco de dados

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

---

## 🎯 Próximos Passos

Algumas sugestões para melhorar o template:

- [ ] Adicionar testes unitários e de integração
- [ ] Implementar refresh tokens
- [ ] Adicionar validação de email
- [ ] Implementar recuperação de senha
- [ ] Adicionar documentação com Swagger/OpenAPI
- [ ] Implementar logging estruturado
- [ ] Adicionar Docker e Docker Compose
- [ ] Implementar cache com Redis
- [ ] Adicionar CI/CD
- [ ] Implementar rate limiting

---

**Desenvolvido com ❤️ para servir como template de API Node.js profissional**
