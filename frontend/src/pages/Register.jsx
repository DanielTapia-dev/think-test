import {useState} from 'react';
import api from '../api/axios';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    empleadoId: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/auth/register', form);
      setSuccess('Usuario registrado con éxito');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Error al registrar');
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: 420}}>
      <h2>Crear cuenta</h2>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          className="form-control my-2"
          placeholder="Correo"
          onChange={onChange}
        />
        <input
          name="username"
          className="form-control my-2"
          placeholder="Usuario"
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          className="form-control my-2"
          placeholder="Contraseña"
          onChange={onChange}
        />
        <input
          name="empleadoId"
          type="number"
          className="form-control my-2"
          placeholder="ID Empleado (opcional)"
          onChange={onChange}
        />
        <button className="btn btn-success w-100">Registrarse</button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}
      {success && <p className="text-success mt-3">{success}</p>}
      <p className="mt-3">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
}
