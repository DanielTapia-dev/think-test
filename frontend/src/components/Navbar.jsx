import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3 shadow-sm">
      <Link className="navbar-brand fw-bold text-primary" to="/solicitudes">
        Think
      </Link>

      <div className="navbar-nav me-auto">
        {user && (
          <>
            <Link className="nav-link" to="/solicitudes">
              Solicitudes
            </Link>
            <Link className="nav-link" to="/empleados">
              Empleados
            </Link>
          </>
        )}
      </div>

      {user ? (
        <div className="d-flex align-items-center">
          <span className="me-3 text-secondary small">
            {user.username || user.email}
          </span>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="navbar-nav">
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Registro
          </Link>
        </div>
      )}
    </nav>
  );
}
