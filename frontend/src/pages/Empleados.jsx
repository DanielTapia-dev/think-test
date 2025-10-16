import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Empleados() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/empleados?page=1&limit=10').then(res => setData(res.data.data.items));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Empleados</h2>
      <ul className="list-group">
        {data.map(e => (
          <li key={e.id} className="list-group-item d-flex justify-content-between">
            <span>{e.nombre}</span>
            <span>${e.salario}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
