import React, { useState, useEffect } from 'react';

function Novedad() {
  const [novedades, setNovedades] = useState([]);
  const [empleados, setEmpleados] = useState([]); // Para almacenar lista de empleados
  const [novedad, setNovedad] = useState({
    id: '',
    empleadoDTO: '',
    numeroDias: '',
    bonificacion: '',
    transporte: '',
    vacacionesDTO: [], // Se puede extender para manejar los datos específicos de vacaciones
    incapacidadesDTO: [], // Se puede extender para manejar los datos específicos de incapacidades
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNovedades();
    fetchEmpleados();
  }, []);

  // Función para obtener las novedades
  const fetchNovedades = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/novedad/v1/listar');
      if (!response.ok) throw new Error('Error al obtener novedades');
      const data = await response.json();
      setNovedades(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para obtener los empleados
  const fetchEmpleados = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/empleado/v1/listar');
      if (!response.ok) throw new Error('Error al obtener empleados');
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para guardar o actualizar la novedad
  const saveOrUpdateNovedad = async (e) => {
    e.preventDefault();

    const novedadData = {
      ...novedad,
      empleadoDTO: { id: novedad.empleadoDTO }, // Asignación del empleado
    };

    const url = editId
      ? `http://localhost:8080/api/novedad/v1/actualizar/${editId}`
      : 'http://localhost:8080/api/novedad/v1/crear';
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novedadData),
      });
      if (!response.ok) throw new Error('Error al guardar o actualizar novedad');
      fetchNovedades();
      setNovedad({
        id: '',
        empleadoDTO: '',
        numeroDias: '',
        bonificacion: '',
        transporte: '',
        vacacionesDTO: [],
        incapacidadesDTO: [],
      });
      setEditId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para eliminar una novedad
  const deleteNovedad = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/novedad/v1/eliminar/${id}`, {
        method: 'DELETE',
      });
      fetchNovedades();
    } catch (error) {
      console.error('Error al eliminar novedad:', error);
    }
  };

  // Función para editar una novedad
  const handleEdit = (novedad) => {
    setNovedad(novedad);
    setEditId(novedad.id);
  };

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovedad({ ...novedad, [name]: value });
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Novedades</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>
  
      <div style={styles.mainWrapper}>
        <main style={styles.mainContent}>
          <div style={styles.hero}>
            <div style={styles.heroText}>
              <h2>GESTIÓN DE NOVEDADES</h2>
            </div>
          </div>
  
          <div style={styles.container}>
            <form onSubmit={saveOrUpdateNovedad} style={styles.form}>
              <select
                name="empleadoDTO"
                value={novedad.empleadoDTO || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Seleccionar Empleado</option>
                {empleados.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.primerNombre} {emp.primerApellido}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="numeroDias"
                placeholder="Número de Días"
                value={novedad.numeroDias || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="number"
                name="bonificacion"
                placeholder="Bonificación"
                value={novedad.bonificacion || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="number"
                name="transporte"
                placeholder="Transporte"
                value={novedad.transporte || ''}
                onChange={handleChange}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                {editId ? 'Actualizar Novedad' : 'Crear Novedad'}
              </button>
            </form>
          </div>
  
          <div style={styles.tableSection}>
            <h2 style={styles.title}>Listado de Novedades</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Empleado</th>
                  <th style={styles.th}>Número de Días</th>
                  <th style={styles.th}>Bonificación</th>
                  <th style={styles.th}>Transporte</th>
                  <th style={styles.th}>Editar</th>
                  <th style={styles.th}>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {novedades.map((nov) => (
                  <tr key={nov.id}>
                    <td style={styles.td}>{nov.empleadoDTO?.primerNombre} {nov.empleadoDTO?.primerApellido}</td>
                    <td style={styles.td}>{nov.numeroDias}</td>
                    <td style={styles.td}>{nov.bonificacion}</td>
                    <td style={styles.td}>{nov.transporte}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(nov)} style={styles.editButton}>
                        Editar
                      </button>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => deleteNovedad(nov.id)} style={styles.deleteButton}>
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
      marginTop: '100px', // Separación para evitar que el header cubra el contenido
      display: 'flex',
      justifyContent: 'center',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '80%', // Ajusta el ancho para centrado
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
      textAlign: 'center',
    },
    title: {
      fontSize: '2em',
      marginBottom: '20px',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    select: {
      padding: '10px',
      width: '100%',
      maxWidth: '300px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      margin: '10px 0',
    },
    input: {
      padding: '10px',
      width: '100%',
      maxWidth: '300px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      margin: '10px 0',
    },
    button: {
      backgroundColor: '#5cb85c',
      color: '#fff',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '300px',
    },
    tableSection: {
      marginTop: '40px',
      maxWidth: '800px',
      width: '100%',
      textAlign: 'center',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      backgroundColor: '#f5f5f5',
      padding: '10px',
      textAlign: 'left',
      border: '1px solid #333',
    },
    td: {
      padding: '10px',
      textAlign: 'left',
      border: '1px solid #333',
    },
    editButton: {
      backgroundColor: '#1E90FF',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      marginRight: '10px',
    },
    deleteButton: {
      backgroundColor: '#FF6347',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
    },
  };
  

export default Novedad;
