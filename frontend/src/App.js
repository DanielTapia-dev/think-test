import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Empleados from './pages/Empleados';
import Solicitudes from './pages/Solicitudes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav className="navbar navbar-expand navbar-light bg-light px-3">
          <Link className="navbar-brand" to="/solicitudes">Think</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/solicitudes">Solicitudes</Link>
            <Link className="nav-link" to="/empleados">Empleados</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/solicitudes" element={<ProtectedRoute><Solicitudes /></ProtectedRoute>} />
          <Route path="/empleados" element={<ProtectedRoute><Empleados /></ProtectedRoute>} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
