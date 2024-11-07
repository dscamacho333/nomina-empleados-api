import React, { useState, useEffect } from 'react';

function EPS() {
  const [eps, setEps] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEps();
  }, []);

  const validateForm = () => {
    if (!nombre) {
      alert('Por favor ingresa un nombre para la EPS');
      return false;
    }
    return true;
  };

  const fetchEps = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/eps/v1/listar');
      if (!response.ok) {
        throw new Error('Error al obtener las EPS');
      }
      const data = await response.json();
      setEps(data);
    } catch (error) {
      console.error('Error al obtener las EPS:', error);
    }
  };

  const saveOrUpdateEps = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const epsItem = { nombreEPS: nombre };

      if (editId) {
        updateEps(editId, epsItem)
          .then(() => {
            fetchEps();
          })
          .catch((error) => {
            console.error('Error al actualizar EPS:', error);
          });
      } else {
        createEps(epsItem)
          .then(() => {
            fetchEps();
          })
          .catch((error) => {
            console.error('Error al crear EPS:', error);
          });
      }
    }
  };

  const createEps = async (epsItem) => {
    return await fetch('http://localhost:8080/api/eps/v1/crear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(epsItem),
    });
  };

  const updateEps = async (id, epsItem) => {
    return await fetch(`http://localhost:8080/api/eps/v1/actualizar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(epsItem),
    });
  };

  const deleteEps = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/eps/v1/eliminar/${id}`, {
        method: 'DELETE',
      });
      fetchEps();
    } catch (error) {
      console.error('Error al eliminar EPS:', error);
    }
  };

  const handleEdit = (epsItem) => {
    setNombre(epsItem.nombreEPS);
    setEditId(epsItem.id);
  };

  return (
    <>
      {/* Encabezado */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - EPS</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>

      {/* Contenido principal */}
      <main style={styles.mainContent}>
        <section style={styles.hero}>
          <div style={styles.heroText}>
            <h2>GESTIÓN DE EPS</h2>
          </div>
        </section>

        {/* Formulario para crear o actualizar EPS */}
        <section style={styles.container}>
          <form style={styles.form}>
            <input
              type="text"
              placeholder="Nombre de la EPS"
              value={nombre || ''}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
            />
            <button onClick={saveOrUpdateEps} style={styles.button}>
              {editId ? 'Actualizar EPS' : 'Crear EPS'}
            </button>
          </form>
        </section>

        {/* Tabla de EPS */}
        <section style={styles.tableSection}>
          <h2 style={styles.title}>Listado de EPS</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre de la EPS</th>
                <th style={styles.th}>Editar</th>
                <th style={styles.th}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {eps.map((epsItem) => (
                <tr key={epsItem.id}>
                  <td style={styles.td}>{epsItem.nombreEPS}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(epsItem)} style={styles.editButton}>
                      Editar
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => deleteEps(epsItem.id)} style={styles.deleteButton}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
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
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '320%',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
  },
  hero: {
    width: '100%',
    textAlign: 'center',
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
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
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
    maxWidth: '600px',
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

export default EPS;
