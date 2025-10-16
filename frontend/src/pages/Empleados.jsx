import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {useEffect, useState} from 'react';
import api from '../api/axios';

export default function Empleados() {
  const [data, setData] = useState([]);
  const {user} = useAuth();

  useEffect(() => {
    api
      .get('/empleados?page=1&limit=10')
      .then((res) => setData(res.data.data.items));
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Empleados</h2>
        {user?.roles?.includes('ADMIN') && (
          <Link to="/empleados/nuevo" className="btn btn-primary">
            Nuevo Empleado
          </Link>
        )}
      </div>

      <ul className="list-group">
        {data.map((e) => (
          <li
            key={e.id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{e.nombre}</span>
            <span>${e.salario}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
