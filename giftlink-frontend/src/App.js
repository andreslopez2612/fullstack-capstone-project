import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DetailsPage from './components/DetailsPage/DetailsPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/gifts/:productId" element={<DetailsPage />} />
      </Routes>
    </>
  );
}
export default App;
