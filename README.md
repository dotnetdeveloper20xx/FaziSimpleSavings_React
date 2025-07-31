# 📘 FaziSimpleSavings React Application Overview

## 🎯 Vision

FaziSimpleSavings is a modern personal finance web application built to help users set savings goals, track progress visually, and stay engaged through automated feedback. The vision was to deliver a seamless and intuitive user experience across desktop and mobile using modern React best practices.

Our goal: **"Empower users to achieve financial goals with clarity, automation, and motivation."**

---

## ⚙️ Tech Stack & Tools

* **React (with TypeScript)** – Component-based SPA architecture
* **Redux Toolkit** – Global state management (auth, goals, notifications)
* **React Router v6** – Client-side routing
* **Tailwind CSS + DaisyUI** – Utility-first and component-based styling
* **Lucide React Icons** – Modern UI iconography
* **Axios** – RESTful API client
* **Custom Backend API** – Clean architecture with JWT auth and data access

---

## 🧠 SPA Architecture Principles Implemented

| Principle                     | Implementation                                                     |
| ----------------------------- | ------------------------------------------------------------------ |
| **Component-Oriented Design** | Reusable UI components (goal cards, modals, forms)                 |
| **Unidirectional Data Flow**  | Redux + hooks architecture for predictable state                   |
| **Separation of Concerns**    | UI (components), Logic (slices), API (apiClient) clearly separated |
| **Modular Folder Structure**  | `/pages`, `/state`, `/components`, `/core`, `/services`            |
| **Global State Management**   | Redux Toolkit used for auth, goals, notifications                  |
| **Route Protection**          | AuthGuard (ProtectedRoute) with conditional redirects              |
| **Visual Feedback**           | Toasts, badges, loading states, field validation                   |
| **Responsive Design**         | Tailwind utilities and mobile-first layout                         |
| **Form Validation**           | Custom validation with touch tracking and inline error messages    |
| **Accessibility**             | Semantic elements, labels, buttons, input focus control            |

---

## 🚀 Key Features Implemented

### 🔐 Authentication

* Register, login, and logout with JWT handling
* Redux-managed auth state (`isAuthenticated`, `token`, `user`)
* Route redirection based on login state

### 🏠 Landing Page

* Responsive hero section
* Clear call-to-actions (login, register)
* Auto-redirect if already authenticated

### 🧾 Dashboard

* Displays list of savings goals with live progress
* "Add New Goal" button opens a modal
* Goal cards show name, progress bar, status tag
* Completed goals are visually marked

### 🎯 Goal Details Page

* View individual goal with transactions and history
* Manual deposit form with validation
* Disables input when goal is completed
* Toast notification on successful deposit

### 🔔 Notifications

* Fetches from `/api/notifications`
* Shows unread vs read visually
* Date formatting: Today, Yesterday, etc.
* Button to mark as read with inline update

### ⚙️ User Settings

* Fetch and update preferred currency
* Toggle email notifications
* Dropdowns and toggles styled via DaisyUI
* Toasts on success/failure

---

## 🧩 Component Highlights

* `<MainLayout>` with top navbar and sidebar
* `<ProtectedRoute>` for route-level auth control
* `<CreateGoalModal>` modal component
* `<Toast>` (per-page for now, centralizable)

---

## 📦 File & Folder Structure Summary

```
/src
├── components       # Reusable components like modals, cards
├── pages            # Route-level views: dashboard, login, settings, etc.
├── state            # Redux slices and store config
├── core             # Axios client, auth utilities
├── services         # API service wrappers (e.g. authService.ts)
```

---

## 🧠 Key Architecture & Principles

### ✅ SPA Principles
- Modular feature folders
- Centralized HTTP client
- Unidirectional data flow
- Clean component separation
- Lazy-loaded protected routes

### ✅ Redux Best Practices
- Thunks used for all API interactions
- Typed `AppDispatch` and `RootState`
- State slices: `auth`, `goals`, `groupGoals`, `notifications`

### ✅ Axios with Interceptors
- Auto-attach `Authorization: Bearer <token>`
- Global 401/403 handling
- Clean base config in `/core/apiClient.ts`

---

## 🧪 Developer Usage

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Start the Application

```bash
npm start
```

- Runs on: `http://localhost:3000`
- Requires API at: `https://localhost:7000`

---

## 🔑 API Endpoints Used in React

> All responses follow this format:
```json
{
  "success": true,
  "message": "string",
  "statusCode": 200,
  "data": ...,
  "errors": null
}
```

### 🔐 Authentication

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | `/api/auth/register`  | Register new user       |
| POST   | `/api/auth/login`     | Login and get JWT token |

---

### 🎯 Savings Goals

| Method | Endpoint                              | Description                    |
|--------|----------------------------------------|--------------------------------|
| POST   | `/api/savingsgoals`                   | Create a new goal              |
| GET    | `/api/savingsgoals`                   | Get all user's goals           |
| GET    | `/api/savingsgoals/progress`          | Get goal progress %            |
| POST   | `/api/savingsgoals/{goalId}/deposit`  | Deposit to a goal manually     |
| GET    | `/api/savingsgoals/{goalId}/transactions` | View goal transactions     |

---

### 👥 Group Goals

| Method | Endpoint                                         | Description                            |
|--------|--------------------------------------------------|----------------------------------------|
| POST   | `/api/group-goals`                               | Create a new group goal                |
| GET    | `/api/group-goals`                               | List user's group goals                |
| GET    | `/api/group-goals/{id}`                          | Get group goal details                 |
| GET    | `/api/group-goals/{id}/transactions`             | View all contributions                 |
| POST   | `/api/group-goals/{id}/contribute`               | Contribute to the group goal           |
| GET    | `/api/group-goals/{id}/available-users`          | List users that can be invited         |
| POST   | `/api/group-goals/{id}/members`                  | Invite a user (send raw GUID)          |

---

### 🔔 Notifications

| Method | Endpoint                               | Description                 |
|--------|-----------------------------------------|-----------------------------|
| GET    | `/api/notifications`                   | Get all notifications       |
| POST   | `/api/notifications/{id}/mark-as-read` | Mark notification as read   |

---

### ⚙️ Settings

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/api/usersettings` | Get current user's settings     |
| PUT    | `/api/usersettings` | Update currency & preferences   |

---

## 🧭 Folder Structure

```
src/
├── components/              # Reusable components (GoalCard, Toast, etc.)
├── features/
│   └── groupGoals/          # All group goal logic (form, thunk, page, etc.)
├── pages/                   # Top-level route views (dashboard, settings, etc.)
├── state/                   # Redux slices, store, and hooks
├── core/                    # Axios client, ProtectedRoute
├── layout/                  # Main app layout wrapper
└── App.tsx                  # Route definitions
```

---

## 👥 User Stories

- As a user, I want to create a goal and track how much I’ve saved.
- As a user, I want to create a group goal and invite others.
- As a group participant, I want to contribute and view history.
- As a user, I want to view my notifications and progress.
- As a user, I want to customize my currency and email settings.

---

## 📚 Backend

> The backend API is built using ASP.NET Core (.NET 9) with Clean Architecture and MediatR.  
> See the [FaziSimpleSavings API repo](https://github.com/your-org/FaziSimpleSavings_API) for details.

---

## 🤝 Contribution Guidelines

- Use `features/` structure for scalable design
- Keep components modular and testable
- Use `AppDispatch` and `AppSelector` with Redux
- Reuse form components and layout where possible

---

## 🧠 Credits

This app was designed and built by [Faz Ahmed](https://github.com/dotnetdeveloper20xx) to showcase full-stack architecture with modern React, Redux Toolkit, and .NET 9.

