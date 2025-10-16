import {useEffect, useState} from 'react';
import api from '../api/axios';
import {useAuth} from '../context/AuthContext';

export default function Solicitudes() {
  const [data, setData] = useState([]);
  const {user} = useAuth();

  async function fetchData() {
    const res = await api.get(
      '/solicitudes?page=1&limit=10&sort=id&order=desc'
    );
    setData(res.data.data.items);
  }

  async function deleteSolicitud(id) {
    await api.delete(`/solicitudes/${id}`);
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Solicitudes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Resumen</th>
            <th>Empleado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.codigo}</td>
              <td>{s.descripcion}</td>
              <td>{s.resumen}</td>
              <td>{s.empleado?.nombre}</td>
              <td>
                {user?.roles?.includes('ADMIN') && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteSolicitud(s.id)}
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
