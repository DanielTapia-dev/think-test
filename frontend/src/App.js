import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Empleados from './pages/Empleados';
import EmpleadoForm from './pages/EmpleadoForm';
import Solicitudes from './pages/Solicitudes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/solicitudes"
            element={<ProtectedRoute><Solicitudes /></ProtectedRoute>}
          />
          <Route
            path="/empleados"
            element={<ProtectedRoute><Empleados /></ProtectedRoute>}
          />
          <Route
            path="/empleados/nuevo"
            element={<ProtectedRoute><EmpleadoForm /></ProtectedRoute>}
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
