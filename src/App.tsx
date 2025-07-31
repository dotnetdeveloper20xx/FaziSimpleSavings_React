import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layout/MainLayout";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import GoalDetailsPage from "./pages/GoalDetailsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import LandingPage from "./pages/LandingPage";
import GroupGoalDetailPage from "./pages/GroupGoalDetailPage";
import GroupGoalsDashboard from "./pages/GroupGoalsDashboard";

// Auth Guard
import ProtectedRoute from "./core/ProtectedRoute";
import GroupGoalForm from "./components/GroupGoalForm";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Protected routes inside layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/goal/:id' element={<GoalDetailsPage />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/settings' element={<SettingsPage />} />

          {/* 👥 Group Goals */}
          <Route path='/group-goals' element={<GroupGoalsDashboard />} />
          <Route path='/group-goals/create' element={<GroupGoalForm />} />
          <Route path='/group-goals/:id' element={<GroupGoalDetailPage />} />
        </Route>
      </Route>
      <Route path='*' element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
