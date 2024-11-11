import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'; // Importa NavBar

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
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch('http://localhost:8080/api/eps/v1/listar', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
          .then(() => fetchEps())
          .catch((error) => console.error('Error al actualizar EPS:', error));
      } else {
        createEps(epsItem)
          .then(() => fetchEps())
          .catch((error) => console.error('Error al crear EPS:', error));
      }
    }
  };

  const createEps = async (epsItem) => {
    const token = localStorage.getItem("jwtToken");

    return await fetch('http://localhost:8080/api/eps/v1/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(epsItem),
    });
  };

  const updateEps = async (id, epsItem) => {
    const token = localStorage.getItem("jwtToken");

    return await fetch(`http://localhost:8080/api/eps/v1/actualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(epsItem),
    });
  };

  const deleteEps = async (id) => {
    const token = localStorage.getItem("jwtToken");

    try {
      await fetch(`http://localhost:8080/api/eps/v1/eliminar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
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
      <NavBar /> {/* Usa el componente NavBar */}

      <main style={styles.mainContent}>
        <section style={styles.hero}>
          <div style={styles.heroText}>
            <h2>GESTIÓN DE EPS</h2>
          </div>
        </section>

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
  mainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "20px",
    marginTop: "100px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "20px",
  },
  heroText: {
    fontSize: "2em",
    fontWeight: "bold",
    color: "#003500",
  },
  container: {
    maxWidth: "600px",
    width: "100%",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    margin: "10px 0",
  },
  button: {
    backgroundColor: "#5cb85c",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "300px",
    transition: "background-color 0.3s ease",
  },
  tableSection: {
    width: "100%",
    maxWidth: "800px",
    marginTop: "40px",
  },
  title: {
    fontSize: "1.5em",
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  editButton: {
    backgroundColor: "#1E90FF",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EPS;
