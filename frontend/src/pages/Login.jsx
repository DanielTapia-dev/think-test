import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/solicitudes');
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={onSubmit}>
        <input name="email" className="form-control my-2" placeholder="Correo" onChange={onChange}/>
        <input name="password" type="password" className="form-control my-2" placeholder="Contraseña" onChange={onChange}/>
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
