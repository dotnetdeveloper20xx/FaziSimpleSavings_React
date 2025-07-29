import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import GoalDetailsPage from "./pages/GoalDetailsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<h1 className='text-center text-2xl'>Home</h1>}
      />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/goal/:id' element={<GoalDetailsPage />} />
      <Route path='/notifications' element={<NotificationsPage />} />
      <Route path='/settings' element={<SettingsPage />} />
    </Routes>
  );
}

export default App;
