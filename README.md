# 🔐 My Auth App

A full-featured **Angular** authentication and user management application with a modern, responsive UI. Built with a clean modular architecture, JWT-based authentication, automatic token refresh, and a polished dashboard experience.

---

## 📸 Overview

This app provides a complete authentication flow — login, register, and profile management — wrapped in a sleek dashboard with charts, a responsive sidebar, and smooth animations. It's designed to connect seamlessly with a backend REST API secured by JWT tokens.

---

## ✨ Features

- 🔑 **JWT Authentication** — Login & register with secure token handling
- 🔄 **Automatic Token Refresh** — Interceptor-based refresh with cookie support
- 👤 **User Profile Page** — View and manage your account details
- 👥 **Users Management Page** — Browse and search all users
- 📊 **Dashboard** — 4 interactive charts (bar, growth, and more)
- 📱 **Fully Responsive** — Mobile-first design across all pages
- 🎨 **Custom Design System** — Variables, mixins, animations, and fonts
- 🔔 **SweetAlert2 Integration** — Polished alert and modal dialogs
- 📄 **Swagger API Docs** — Embedded iframe for live API documentation
- 🚪 **Logout Modal** — Shared confirmation modal across sidebar and profile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Angular** | Frontend framework |
| **TypeScript** | Type-safe development |
| **SCSS** | Styling with custom design system |
| **JWT** | Authentication tokens |
| **SweetAlert2** | Alert & modal dialogs |
| **HTTP Interceptors** | Token injection & refresh |
| **Angular Router** | Lazy-loaded feature modules |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/                        # Auth module (login, register, routing)
│   │   ├── pages/
│   │   │   ├── login/               # Login page
│   │   │   └── register/            # Register page
│   │   ├── auth-routing-module.ts
│   │   └── auth-module.ts
│   │
│   ├── core/                        # Core singleton services & guards
│   │   ├── guards/                  # Auth guard
│   │   ├── interceptor/             # Token interceptor (JWT + refresh)
│   │   ├── interfaces/              # Shared TypeScript interfaces
│   │   └── services/
│   │       ├── alert/               # SweetAlert2 wrapper
│   │       ├── errorHandler/        # Global error handler
│   │       ├── loadingService/      # Global loading state
│   │       ├── storage/             # LocalStorage service
│   │       ├── dashboard-service/   # Dashboard data service
│   │       └── auth.service.ts      # Auth API service
│   │
│   ├── features/                    # Lazy-loaded feature modules
│   │   ├── dashboard/               # Dashboard with charts
│   │   ├── profile/                 # User profile page
│   │   ├── users/                   # Users list page
│   │   └── api-docs/                # Swagger API docs iframe
│   │
│   └── shared/                      # Shared components & styles
│       ├── components/
│       │   └── sidebar/             # Responsive sidebar
│       └── styles/
│           ├── _variables.scss
│           ├── _mixins.scss
│           ├── _animations.scss
│           ├── _fonts.scss
│           ├── _utilities.scss
│           └── _global.scss
│
├── assets/
│   └── fonts/inter/                 # Inter font family
└── public/
    └── icons/                       # Custom SVG icons
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18.x`
- Angular CLI `>= 17.x`
- A running backend API with JWT support

### Installation

```bash
# Clone the repository
git clone https://github.com/salamomar088/my-auth-app.git

# Navigate to the project
cd my-auth-app

# Install dependencies
npm install

# Start the development server
ng serve
```

The app will be available at `http://localhost:4200`

---

## ⚙️ Configuration

Update the API base URL in your environment file or service to point to your backend:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'  // your backend URL
};
```

---

## 🔐 Authentication Flow

1. User logs in → backend returns **access token** + **refresh token** (cookie)
2. Token is stored via `LocalStorageService`
3. `TokenInterceptor` injects the token into every HTTP request
4. On token expiry → interceptor automatically calls the refresh endpoint
5. Auth guard protects all private routes

---

## 📊 Dashboard

The dashboard displays real-time data through 4 interactive charts:
- User growth bar chart
- Additional analytics visualizations

Data is fetched via `DashboardService` from the connected backend API.

---

## 📱 Responsive Design

The app is fully responsive across all screen sizes:
- **Mobile** — Collapsible sidebar, stacked layouts, touch-friendly UI
- **Tablet** — Adaptive grid and component sizing
- **Desktop** — Full sidebar, multi-column layouts

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Omar Salam**
- GitHub: [@salamomar088](https://github.com/salamomar088)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
