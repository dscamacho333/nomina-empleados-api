import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'; // Importa NavBar

function Incapacidad() {
  const [incapacidades, setIncapacidades] = useState([]);
  const [novedades, setNovedades] = useState([]);
  const [incapacidad, setIncapacidad] = useState({
    id: '',
    novedadDTO: '',
    numeroDias: '',
    fechaInicio: '',
    fechaTerminacion: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchIncapacidades();
    fetchNovedades();
  }, []);

  const getToken = () => localStorage.getItem("jwtToken");

  const fetchIncapacidades = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/incapacidad/v1/listar', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Error al obtener incapacidades');
      const data = await response.json();
      setIncapacidades(data);
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

  const saveOrUpdateIncapacidad = async (e) => {
    e.preventDefault();

    const incapacidadData = {
      ...incapacidad,
      novedadDTO: { id: parseInt(incapacidad.novedadDTO) },
    };

    const url = editId
      ? `http://localhost:8080/api/incapacidad/v1/actualizar/${editId}`
      : 'http://localhost:8080/api/incapacidad/v1/crear';
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(incapacidadData),
      });
      if (!response.ok) throw new Error('Error al guardar o actualizar incapacidad');
      fetchIncapacidades();
      setIncapacidad({
        id: '',
        novedadDTO: '',
        numeroDias: '',
        fechaInicio: '',
        fechaTerminacion: '',
      });
      setEditId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteIncapacidad = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/incapacidad/v1/eliminar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchIncapacidades();
    } catch (error) {
      console.error('Error al eliminar incapacidad:', error);
    }
  };

  const handleEdit = (incapacidad) => {
    setIncapacidad({
      id: incapacidad.id,
      novedadDTO: incapacidad.novedadDTO.id,
      numeroDias: incapacidad.numeroDias,
      fechaInicio: incapacidad.fechaInicio,
      fechaTerminacion: incapacidad.fechaTerminacion,
    });
    setEditId(incapacidad.id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncapacidad({
      ...incapacidad,
      [name]: name === "novedadDTO" ? parseInt(value) : value,
    });
  };

  return (
    <>
      <NavBar /> {/* Usa el componente NavBar */}

      <div style={styles.mainWrapper}>
        <main style={styles.mainContent}>
          <div style={styles.hero}>
            <div style={styles.heroText}>
              <h2>GESTIÓN DE INCAPACIDADES</h2>
            </div>
          </div>

          <div style={styles.container}>
            <form onSubmit={saveOrUpdateIncapacidad} style={styles.form}>
              <select
                name="novedadDTO"
                value={incapacidad.novedadDTO || ''}
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
                value={incapacidad.numeroDias || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="date"
                name="fechaInicio"
                placeholder="Fecha de Inicio"
                value={incapacidad.fechaInicio || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="date"
                name="fechaTerminacion"
                placeholder="Fecha de Terminación"
                value={incapacidad.fechaTerminacion || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                {editId ? 'Actualizar Incapacidad' : 'Crear Incapacidad'}
              </button>
            </form>
          </div>

          <div style={styles.tableSection}>
            <h2 style={styles.title}>Listado de Incapacidades</h2>
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
                {incapacidades.map((incap) => (
                  <tr key={incap.id}>
                    <td style={styles.td}>Novedad {incap.novedadDTO?.id}</td>
                    <td style={styles.td}>{incap.numeroDias}</td>
                    <td style={styles.td}>{incap.fechaInicio}</td>
                    <td style={styles.td}>{incap.fechaTerminacion}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(incap)} style={styles.editButton}>
                        Editar
                      </button>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => deleteIncapacidad(incap.id)} style={styles.deleteButton}>
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

export default Incapacidad;
