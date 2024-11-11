import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'; // Importa NavBar

function Vacaciones() {
  const [vacaciones, setVacaciones] = useState([]);
  const [novedades, setNovedades] = useState([]);
  const [vacacion, setVacacion] = useState({
    id: '',
    novedad: '',
    numeroDias: '',
    fechaInicio: '',
    fechaTerminacion: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchVacaciones();
    fetchNovedades();
  }, []);

  const getToken = () => localStorage.getItem("jwtToken");

  const fetchVacaciones = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/vacaciones/v1/listar', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Error al obtener vacaciones');
      const data = await response.json();
      setVacaciones(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchNovedades = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/novedad/v1/listar', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Error al obtener novedades');
      const data = await response.json();
      setNovedades(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveOrUpdateVacacion = async (e) => {
    e.preventDefault();

    const vacacionData = {
      ...vacacion,
      novedad: { id: vacacion.novedad },
    };

    const url = editId
      ? `http://localhost:8080/api/vacaciones/v1/actualizar/${editId}`
      : 'http://localhost:8080/api/vacaciones/v1/crear';
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(vacacionData),
      });
      if (!response.ok) throw new Error('Error al guardar o actualizar vacación');
      fetchVacaciones();
      setVacacion({
        id: '',
        novedad: '',
        numeroDias: '',
        fechaInicio: '',
        fechaTerminacion: '',
      });
      setEditId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteVacacion = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/vacaciones/v1/eliminar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchVacaciones();
    } catch (error) {
      console.error('Error al eliminar vacación:', error);
    }
  };

  const handleEdit = (vacacion) => {
    setVacacion({
      id: vacacion.id,
      novedad: vacacion.novedad.id,
      numeroDias: vacacion.numeroDias,
      fechaInicio: vacacion.fechaInicio,
      fechaTerminacion: vacacion.fechaTerminacion,
    });
    setEditId(vacacion.id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVacacion({ ...vacacion, [name]: value });
  };

  return (
    <>
      <NavBar /> {/* Usa el componente NavBar */}

      <div style={styles.mainWrapper}>
        <main style={styles.mainContent}>
          <div style={styles.hero}>
            <div style={styles.heroText}>
              <h2>GESTIÓN DE VACACIONES</h2>
            </div>
          </div>

          <div style={styles.container}>
            <form onSubmit={saveOrUpdateVacacion} style={styles.form}>
              <select
                name="novedad"
                value={vacacion.novedad || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Seleccionar Novedad</option>
                {novedades.map((nov) => (
                  <option key={nov.id} value={nov.id}>
                    Novedad {nov.id}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="numeroDias"
                placeholder="Número de Días"
                value={vacacion.numeroDias || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="date"
                name="fechaInicio"
                placeholder="Fecha de Inicio"
                value={vacacion.fechaInicio || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="date"
                name="fechaTerminacion"
                placeholder="Fecha de Terminación"
                value={vacacion.fechaTerminacion || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                {editId ? 'Actualizar Vacación' : 'Crear Vacación'}
              </button>
            </form>
          </div>

          <div style={styles.tableSection}>
            <h2 style={styles.title}>Listado de Vacaciones</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Novedad</th>
                  <th style={styles.th}>Número de Días</th>
                  <th style={styles.th}>Fecha de Inicio</th>
                  <th style={styles.th}>Fecha de Terminación</th>
                  <th style={styles.th}>Editar</th>
                  <th style={styles.th}>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {vacaciones.map((vac) => (
                  <tr key={vac.id}>
                    <td style={styles.td}>Novedad {vac.novedad?.id}</td>
                    <td style={styles.td}>{vac.numeroDias}</td>
                    <td style={styles.td}>{vac.fechaInicio}</td>
                    <td style={styles.td}>{vac.fechaTerminacion}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(vac)} style={styles.editButton}>
                        Editar
                      </button>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => deleteVacacion(vac.id)} style={styles.deleteButton}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#F5F5F0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    borderBottom: '2px solid #ddd',
  },
  logo: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#003500',
  },
  contactButton: {
    backgroundColor: '#003500',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1em',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  mainWrapper: {
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    textAlign: 'center',
  },
  hero: {
    width: '100%',
    textAlign: 'center',
  },
  heroText: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#003500',
    marginBottom: '20px',
  },
  container: {
    marginTop: '20px',
    maxWidth: '600px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#5cb85c',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  tableSection: {
    marginTop: '40px',
    maxWidth: '800px',
    width: '100%',
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  editButton: {
    backgroundColor: '#1E90FF',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Vacaciones;

