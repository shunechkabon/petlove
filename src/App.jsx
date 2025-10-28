import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage"; 
import AddPetPage from "./pages/AddPetPage/AddPetPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import NoticesPage from "./pages/NoticesPage/NoticesPage";
import OurFriendsPage from "./pages/OurFriendsPage/OurFriendsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Layout from "./components/Layout/Layout";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Splash-page */}
      <Route path="/" element={<MainPage />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/friends" element={<OurFriendsPage />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          } />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
        <Route
          path="/profile"
          element={
            <PrivateRoute redirectTo="/login">
              <ProfilePage />
            </PrivateRoute>
          } />
        <Route
          path="/add-pet"
          element={
            <PrivateRoute>
              <AddPetPage />
            </PrivateRoute>
          } />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
