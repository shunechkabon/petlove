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
// import PublicRoute from "./routes/PublicRoute";
// import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/friends" element={<OurFriendsPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-pet" element={<AddPetPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
