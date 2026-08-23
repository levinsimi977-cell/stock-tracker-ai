# StockTracker AI

### Full-Stack Stock Portfolio Management and AI-Assisted Market Analysis Platform

StockTracker AI is a full-stack web application for managing stock portfolios, executing simulated transactions, monitoring market data, and generating AI-assisted stock analysis.

The system combines a React frontend with a Spring Boot backend, JWT-based authentication and role-based authorization, portfolio and transaction management, algorithmic market indicators, and Large Language Model (LLM) integration through Hugging Face.

---

## Overview

StockTracker AI was designed as a software engineering project that combines traditional application development with AI-assisted financial analysis.

The platform provides two complementary analysis approaches:

- **Algorithmic market analysis** using indicators such as EMA and weighted linear regression.
- **LLM-based analysis** using the Qwen 2.5 72B Instruct model through the Hugging Face API.

Users can manage their portfolio, monitor stock information, perform transactions, view ownership and transaction history, and receive analytical insights based on available stock data.

The application also includes an administrative interface for managing stocks and monitoring portfolio and transaction activity.

> **Note:** StockTracker AI is an educational software project. Its analysis and predictions are not financial advice.

---

## Key Features

### Portfolio Management

- View portfolio holdings and stock ownership.
- Track portfolio value and balances.
- View transaction history.
- Deposit and withdraw funds from the application wallet.
- Calculate profit and loss for holdings.
- Monitor individual stock positions.

### Stock Management

- Browse available stocks.
- View detailed stock information.
- Display historical price data.
- Analyze stock trends and momentum.
- Calculate market indicators.
- Generate future price estimates based on the application's algorithmic analysis.

### AI-Assisted Analysis

- Integrates an external Large Language Model through the Hugging Face API.
- Uses `Qwen/Qwen2.5-72B-Instruct`.
- Sends structured stock information and calculated market indicators to the LLM.
- Generates natural-language stock analysis and recommendations.
- Provides AI-assisted insights alongside the application's algorithmic calculations.

### Algorithmic Analysis

The backend implements quantitative analysis based on historical stock data, including:

- Exponential Moving Average (EMA)
- Weighted Linear Regression
- Trend analysis
- Momentum calculations
- Risk calculations
- Price estimation
- BUY / SELL / HOLD classification

The algorithmic analysis is implemented independently from the LLM-based analysis, allowing the application to combine deterministic calculations with AI-generated interpretation.

### Authentication and Authorization

- User registration and login.
- JWT-based authentication.
- Stateless authentication using Spring Security.
- BCrypt password hashing.
- Role-based authorization.
- Separate `USER` and `ADMIN` access levels.
- Protected frontend routes.
- Protected backend endpoints.

### Administration

Administrators have access to dedicated functionality for:

- Adding stocks.
- Updating stocks.
- Removing stocks.
- Viewing global portfolio information.
- Monitoring today's transactions.
- Accessing administrative dashboards.

---

## System Architecture

The application follows a client-server architecture:

```text
┌─────────────────────────────────────────────────────────────┐
│                       React Frontend                         │
│                                                             │
│  Dashboard │ Stock Details │ Portfolio │ Wallet │ Trading  │
│                                                             │
│  Redux Toolkit │ React Router │ React Query │ Axios         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ HTTP / REST
                               │ JWT Authorization
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Spring Boot Backend                      │
│                                                             │
│ Controllers                                                 │
│      │                                                      │
│      ▼                                                      │
│ Services                                                   │
│      │                                                      │
│      ├──────────────► Stock Analysis                        │
│      │                 │                                    │
│      │                 ├── EMA                             │
│      │                 ├── Weighted Linear Regression      │
│      │                 └── Market Indicators               │
│      │                                                      │
│      ├──────────────► AI Service                            │
│      │                 │                                    │
│      │                 └── Hugging Face / Qwen              │
│      │                                                      │
│      ▼                                                      │
│ Repositories                                                │
│      │                                                      │
│      ▼                                                      │
│ H2 Database                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Application Flow

A typical stock analysis flow is:

```text
User
 │
 ▼
React Dashboard
 │
 ▼
Spring Boot REST API
 │
 ├──────────────► Retrieve stock data
 │
 ├──────────────► Calculate market indicators
 │
 ├──────────────► Calculate prediction / trend
 │
 └──────────────► Request LLM analysis
                       │
                       ▼
                Hugging Face API
                       │
                       ▼
                  Qwen 2.5 72B
                       │
                       ▼
                AI-generated analysis
                       │
                       ▼
                 Backend response
                       │
                       ▼
                React visualization
```

---

# AI and Market Analysis

One of the main goals of the project is to combine deterministic market calculations with LLM-based interpretation.

## Algorithmic Analysis

The backend calculates technical indicators from historical stock prices.

### Exponential Moving Average

EMA is used to smooth historical price data and identify the underlying price trend.

### Weighted Linear Regression

The application uses weighted linear regression to estimate the direction of the stock price based on the calculated EMA values.

The resulting slope is used as one of the inputs for the application's trend and prediction logic.

### Momentum and Risk

The backend also calculates additional indicators used to characterize stock behavior, including momentum and risk-related values.

These calculations are used by the application before generating its final analysis.

---

## LLM Integration

The application integrates with the Hugging Face inference API.

The AI service sends structured information about a stock, including calculated values and historical information, to the LLM.

The current model configured by the application is:

```text
Qwen/Qwen2.5-72B-Instruct
```

The LLM is used to generate natural-language analysis based on the information supplied by the backend.

This creates two complementary layers:

```text
Historical Stock Data
        │
        ▼
Algorithmic Analysis
        │
        ├── EMA
        ├── Regression
        ├── Momentum
        ├── Risk
        └── Prediction
                │
                ▼
          Structured Data
                │
                ▼
          Qwen LLM Analysis
                │
                ▼
       Natural-Language Insight
```

The LLM therefore acts as an analysis and interpretation layer rather than replacing the application's deterministic calculations.

---

# Backend

The backend is implemented using Java and Spring Boot.

## Backend Responsibilities

The backend is responsible for:

- REST API endpoints.
- Authentication and authorization.
- User management.
- Stock management.
- Portfolio management.
- Transaction processing.
- Wallet operations.
- Stock ownership.
- Market calculations.
- AI integration.
- Data persistence.
- Validation and security configuration.

## Backend Architecture

The backend follows a layered architecture:

```text
Controller
    │
    ▼
Service
    │
    ├── Business Logic
    ├── Stock Analysis
    ├── AI Integration
    └── Portfolio Logic
    │
    ▼
Repository
    │
    ▼
Database
```

This separation keeps HTTP handling, business logic, and persistence responsibilities distinct.

---

# Authentication and Security

Security is implemented using Spring Security and JSON Web Tokens (JWT).

## Authentication Flow

```text
User
 │
 ├── Register
 │
 ▼
Login
 │
 ▼
Backend validates credentials
 │
 ▼
JWT generated
 │
 ▼
Frontend stores authentication state
 │
 ▼
JWT sent with protected requests
 │
 ▼
AuthTokenFilter
 │
 ▼
JWT validation
 │
 ▼
Spring Security Context
 │
 ▼
Authorized request
```

The JWT contains the authenticated user's email and role.

The backend uses a custom authentication filter to extract and validate the token before processing protected requests.

## Roles

The application currently supports:

- `USER`
- `ADMIN`

Different API endpoints and frontend routes are protected according to the user's role.

For example:

```text
USER
 ├── Stock Details
 ├── Wallet
 ├── Portfolio
 └── Trading

ADMIN
 ├── All USER capabilities
 ├── Stock Management
 ├── Global Portfolio Management
 └── Transaction Monitoring
```

Passwords are handled using BCrypt through Spring Security.

---

# Frontend

The frontend is implemented using React and Vite.

## Main Technologies

- React
- Vite
- Redux Toolkit
- React Redux
- React Router
- React Query
- Axios
- Recharts
- Framer Motion
- Lucide React

## Frontend Responsibilities

The frontend provides:

- Authentication screens.
- Stock dashboard.
- Stock details.
- Portfolio views.
- Wallet management.
- Transaction management.
- Stock ownership views.
- Administrative dashboards.
- Protected routing.
- Data visualization.

The application uses React Router to separate public routes, authenticated user routes, and administrator-only routes.

---

# Frontend Routing

The application separates routes into three main access levels.

### Public Routes

```text
/stocks
/login
/register
```

### Authenticated User Routes

```text
/stock/:symbol
/wallet
/portfolio
/trade
```

### Administrator Routes

```text
/manager
/addStockM
/updateStock
/DeleteStock
/globalPortfolioM
/todayTransactions
```

Protected routes verify the authentication token and, where required, the user's role before rendering the requested page.

---

# Portfolio and Transaction Management

The application models the main entities required for a stock portfolio management system.

Core functionality includes:

```text
User
 │
 ├── Wallet Balance
 │
 ├── Stock Ownership
 │
 └── Transactions
          │
          ├── Buy
          └── Sell
```

The backend provides operations for:

- Depositing funds.
- Withdrawing funds.
- Checking account balance.
- Executing transactions.
- Tracking stock ownership.
- Viewing transaction history.
- Calculating portfolio-related values.

---

# API

The backend exposes REST endpoints for the application's main capabilities.

Examples include:

```text
/api/users/register
/api/users/login
/api/users/deposit
/api/users/withdraw
/api/users/balance
/api/stocks
/api/transactions
```

The stock API also exposes analysis-oriented operations for:

- Stock analysis.
- Sector analysis.
- Momentum analysis.
- Future price estimation.
- Expert/AI-assisted advice.

The project also includes Springdoc/OpenAPI support for API documentation.

---

# Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 |
| Frontend Build Tool | Vite |
| State Management | Redux Toolkit |
| Server State | React Query |
| Routing | React Router |
| HTTP Client | Axios |
| Data Visualization | Recharts |
| UI Animation | Framer Motion |
| Backend | Java / Spring Boot |
| Web Layer | Spring Web |
| Persistence | Spring Data JPA |
| Database | H2 |
| Security | Spring Security |
| Authentication | JWT |
| Password Hashing | BCrypt |
| AI Integration | Hugging Face API |
| LLM | Qwen 2.5 72B Instruct |
| API Documentation | Springdoc OpenAPI |
| Build Tool | Maven |

---

# Project Structure

```text
stock-tracker-ai/
│
├── README.md
│
├── backend/
│   └── stock-trocker/
│       ├── pom.xml
│       └── src/
│           └── main/
│               └── java/
│                   └── com/example/stocktrocker/
│                       ├── controller/
│                       ├── entities/
│                       ├── repository/
│                       ├── service/
│                       └── security/
│
└── frontend/
    └── stack-Tracer/
        ├── package.json
        ├── vite.config.js
        └── src/
            ├── components/
            ├── features/
            ├── app/
            ├── assets/
            ├── App.jsx
            ├── ProtectedRoute.jsx
            └── main.jsx
```

---

# Backend Dependencies

The backend is managed using Maven.

Key dependencies include:

- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Validation
- Spring Boot Starter WebSocket
- Spring Boot Starter Security
- Spring Boot Starter Mail
- JJWT
- Springdoc OpenAPI
- H2
- Lombok

---

# Frontend Dependencies

The frontend is managed using npm.

Key dependencies include:

- React
- React DOM
- Redux Toolkit
- React Redux
- React Router
- React Query
- Axios
- Recharts
- Framer Motion
- Lucide React
- Vite

---

# Getting Started

## Prerequisites

Make sure the following are installed:

- Java
- Maven
- Node.js
- npm

The backend Maven configuration targets Java 21 and also specifies Maven compiler source/target settings, so the Java version should be aligned with the project's Maven configuration before running the application.

---

## 1. Clone the Repository

```bash
git clone https://github.com/levinsimi977-cell/stock-tracker-ai.git
cd stock-tracker-ai
```

---

## 2. Start the Backend

Navigate to the backend directory:

```bash
cd backend/stock-trocker
```

Build the project:

```bash
mvn clean install
```

Run the application:

```bash
mvn spring-boot:run
```

---

## 3. Configure AI Integration

The AI service requires a Hugging Face API token.

The token should be provided through application configuration or an environment variable rather than committed to the repository.

Example:

```properties
huggingface.api.key=YOUR_HUGGING_FACE_TOKEN
```

> Never commit real API keys, JWT secrets, passwords, or other credentials to Git.

---

## 4. Start the Frontend

Open a new terminal and navigate to:

```bash
cd frontend/stack-Tracer
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# Development Commands

## Backend

```bash
mvn clean install
mvn spring-boot:run
```

## Frontend

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

---

# Example User Workflow

A typical user interaction looks like this:

```text
1. Register an account
        │
        ▼
2. Log in
        │
        ▼
3. Receive JWT authentication
        │
        ▼
4. Browse stocks
        │
        ▼
5. Open a stock
        │
        ▼
6. View historical information
        │
        ▼
7. Analyze market indicators
        │
        ▼
8. Request AI-assisted analysis
        │
        ▼
9. Review the generated insights
        │
        ▼
10. Manage portfolio / execute transactions
```

---

# Engineering Highlights

This project demonstrates practical experience with several software engineering concepts:

### Full-Stack Development

Designing and integrating a React frontend with a Java Spring Boot backend.

### REST API Design

Building backend endpoints for users, stocks, transactions, portfolio management, and analysis.

### Layered Architecture

Separating controllers, services, repositories, security components, and frontend features.

### Authentication

Implementing JWT-based stateless authentication using Spring Security.

### Authorization

Implementing role-aware access control for regular users and administrators.

### Data Persistence

Using JPA-based persistence and entity/repository abstractions.

### AI Integration

Integrating an external LLM API into a traditional backend application.

### Algorithmic Analysis

Implementing EMA and weighted linear regression as part of stock analysis and prediction logic.

### Frontend State Management

Using Redux Toolkit and React Query to manage application and server state.

### Data Visualization

Using Recharts to visualize stock and portfolio information.

---

# Design Approach

A central design principle of the project is to keep deterministic business logic separate from AI-generated interpretation.

```text
                  ┌──────────────────────┐
                  │   Historical Data    │
                  └──────────┬───────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 ▼                       ▼
       ┌──────────────────┐    ┌──────────────────┐
       │ Algorithmic      │    │ LLM Analysis     │
       │ Analysis         │    │                  │
       │                  │    │ Qwen 2.5         │
       │ EMA              │    │ via Hugging Face │
       │ Regression       │    │                  │
       │ Momentum         │    │ Natural-language │
       │ Risk             │    │ interpretation   │
       └────────┬─────────┘    └────────┬─────────┘
                │                       │
                └───────────┬───────────┘
                            ▼
                  ┌─────────────────────┐
                  │ Combined Analysis   │
                  │ and User Insight    │
                  └─────────────────────┘
```

This approach makes it possible to distinguish between calculations performed directly by the application and interpretations generated by the LLM.

---

# Security Considerations

The project implements several security mechanisms, including:

- JWT authentication.
- Stateless Spring Security sessions.
- BCrypt password hashing.
- Role-based authorization.
- Protected API endpoints.
- Protected frontend routes.
- CORS configuration.

For production deployment, sensitive configuration values such as:

- API keys
- JWT secrets
- Database credentials
- Mail credentials

should be supplied through environment variables or a secure secret-management system.

---

# Current Limitations

This project is primarily an educational and portfolio-oriented application.

The following areas would require additional work before production deployment:

- Production-grade database configuration.
- Secure external secret management.
- Comprehensive automated test coverage.
- Production deployment configuration.
- Additional API validation and error handling.
- Security hardening and security auditing.
- Scalability and observability improvements.
- More robust market-data infrastructure.

---

# Future Improvements

Potential future improvements include:

- Production database integration.
- Containerized deployment.
- CI/CD pipeline.
- Automated unit and integration testing.
- Improved market-data providers.
- More advanced quantitative models.
- Additional portfolio analytics.
- Improved AI prompt evaluation.
- AI response validation and structured outputs.
- Caching for frequently requested market data.
- Improved observability and logging.
- Production-grade secret management.

---

# Academic Context

StockTracker AI was developed as a software engineering project with the goal of applying software development principles to a complete full-stack system.

The project combines:

- Object-oriented programming.
- Backend development.
- Frontend development.
- Database persistence.
- REST API design.
- Authentication and authorization.
- Software architecture.
- Data analysis.
- AI/LLM integration.

---

# Project Status

The project is currently maintained as a development and portfolio project.

The core application includes:

- Full-stack architecture.
- User authentication.
- Role-based access control.
- Stock management.
- Portfolio management.
- Transactions.
- Wallet operations.
- Algorithmic stock analysis.
- AI-assisted stock analysis.
- Administrative functionality.

---

# Disclaimer

StockTracker AI is an educational software project.

Any stock analysis, prediction, classification, or AI-generated recommendation produced by the application is intended for demonstration and educational purposes only and should not be interpreted as financial advice.

---

# Author

**Sima Levin**

Software Engineering | Full-Stack Development | AI Integration

GitHub: [levinsimi977-cell](https://github.com/levinsimi977-cell)
