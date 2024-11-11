import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'; // Importa NavBar

function Cargos() {
  const [cargos, setCargos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCargos();
  }, []);

  const validateForm = () => {
    if (!nombre) {
      alert('Por favor ingresa un nombre para el cargo');
      return false;
    }
    return true;
  };

  const fetchCargos = async () => {
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch('http://localhost:8080/api/cargo/v1/listar', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los cargos');
      }
      const data = await response.json();
      setCargos(data);
    } catch (error) {
      console.error('Error al obtener los cargos:', error);
    }
  };

  const saveOrUpdateCargos = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const cargoItem = { nombreCargo: nombre };

      if (editId) {
        updateCargo(editId, cargoItem)
          .then(() => fetchCargos())
          .catch((error) => console.error('Error al actualizar cargo:', error));
      } else {
        createCargo(cargoItem)
          .then(() => fetchCargos())
          .catch((error) => console.error('Error al crear cargo:', error));
      }
    }
  };

  const createCargo = async (cargoItem) => {
    const token = localStorage.getItem("jwtToken");

    return await fetch('http://localhost:8080/api/cargo/v1/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cargoItem),
    });
  };

  const updateCargo = async (id, cargoItem) => {
    const token = localStorage.getItem("jwtToken");

    return await fetch(`http://localhost:8080/api/cargo/v1/actualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cargoItem),
    });
  };

  const deleteCargo = async (id) => {
    const token = localStorage.getItem("jwtToken");

    try {
      await fetch(`http://localhost:8080/api/cargo/v1/eliminar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCargos();
    } catch (error) {
      console.error('Error al eliminar cargo:', error);
    }
  };

  const handleEdit = (cargoItem) => {
    setNombre(cargoItem.nombreCargo);
    setEditId(cargoItem.id);
  };

  return (
    <>
      <NavBar /> {/* Usa el componente NavBar */}

      <main style={styles.mainContent}>
        <section style={styles.hero}>
          <div style={styles.heroText}>
            <h2>GESTIÓN DE CARGOS</h2>
          </div>
        </section>

        <section style={styles.container}>
          <form style={styles.form}>
            <input
              type="text"
              placeholder="Nombre del Cargo"
              value={nombre || ''}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
            />
            <button onClick={saveOrUpdateCargos} style={styles.button}>
              {editId ? 'Actualizar Cargo' : 'Crear Cargo'}
            </button>
          </form>
        </section>

        <section style={styles.tableSection}>
          <h2 style={styles.title}>Listado de Cargos</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre del Cargo</th>
                <th style={styles.th}>Editar</th>
                <th style={styles.th}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {cargos.map((cargoItem) => (
                <tr key={cargoItem.id}>
                  <td style={styles.td}>{cargoItem.nombreCargo}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleEdit(cargoItem)}
                      style={styles.editButton}
                    >
                      Editar
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => deleteCargo(cargoItem.id)}
                      style={styles.deleteButton}
                    >
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

export default Cargos;
