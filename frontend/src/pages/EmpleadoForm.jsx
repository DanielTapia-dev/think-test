import {useState} from 'react';
import api from '../api/axios';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EmpleadoForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    salario: '',
    fecha_ingreso: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await api.post('/empleados', form);
      setSuccess('Empleado creado correctamente');
      setTimeout(() => navigate('/empleados'), 1500);
    } catch (err) {
      setError(
        err.response?.data?.error?.message || 'Error al crear el empleado'
      );
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: 420}}>
      <h2>Nuevo Empleado</h2>
      <form onSubmit={onSubmit}>
        <input
          name="nombre"
          className="form-control my-2"
          placeholder="Nombre del empleado"
          value={form.nombre}
          onChange={onChange}
          required
        />
        <input
          name="salario"
          type="number"
          step="0.01"
          className="form-control my-2"
          placeholder="Salario"
          value={form.salario}
          onChange={onChange}
          required
        />
        <input
          name="fecha_ingreso"
          type="date"
          className="form-control my-2"
          value={form.fecha_ingreso}
          onChange={onChange}
          required
        />
        <button className="btn btn-success w-100">Guardar</button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}
      {success && <p className="text-success mt-3">{success}</p>}
    </div>
  );
}
