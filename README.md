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

## ✅ Development Highlights

* Fully mobile responsive
* SPA experience with no full page reloads
* Error boundary via global toast or alert
* Form validation and user feedback best practices

---

## 🏁 Final Thoughts

FaziSimpleSavings delivers a clean, modern, and interactive SPA built with performance, modularity, and user-centric design in mind. Every interaction was considered from the lens of clarity, accessibility, and user trust — enabling users to achieve their financial goals with confidence.

---

> Built with ❤️ using modern React.
