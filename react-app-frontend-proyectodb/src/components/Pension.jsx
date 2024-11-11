import React, { useState, useEffect } from 'react';

function Pension() {
  const [pensiones, setPensiones] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPensiones();
  }, []);

  const getToken = () => localStorage.getItem("jwtToken");

  const validateForm = () => {
    if (!nombre) {
      alert('Por favor ingresa un nombre para la pensión');
      return false;
    }
    return true;
  };

  const fetchPensiones = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pension/v1/listar', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error('Error al obtener las pensiones');
      const data = await response.json();
      setPensiones(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveOrUpdatePension = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const pensionItem = { nombrePension: nombre };

      try {
        const response = editId 
          ? await updatePension(editId, pensionItem)
          : await createPension(pensionItem);

        console.log('Respuesta:', response);
        fetchPensiones();
        setNombre('');
        setEditId(null);
      } catch (error) {
        console.error(`Error al ${editId ? 'actualizar' : 'crear'} la pensión:`, error);
      }
    }
  };

  const createPension = async (pensionItem) => {
    return await fetch('http://localhost:8080/api/pension/v1/crear', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(pensionItem),
    });
  };

  const updatePension = async (id, pensionItem) => {
    return await fetch(`http://localhost:8080/api/pension/v1/actualizar/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(pensionItem),
    });
  };

  const deletePension = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/pension/v1/eliminar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchPensiones();
    } catch (error) {
      console.error('Error al eliminar la pensión:', error);
    }
  };

  const handleEdit = (pensionItem) => {
    setNombre(pensionItem.nombrePension);
    setEditId(pensionItem.id);
  };

  return (
    <>
      {/* Encabezado */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>UroCol - Pensión</h1>
        </div>
        <button style={styles.contactButton}>Contáctanos</button>
      </header>

      {/* Contenido principal */}
      <main style={styles.mainContent}>
        <section style={styles.hero}>
          <div style={styles.heroText}>
            <h2>GESTIÓN DE PENSIONES</h2>
          </div>
        </section>

        {/* Formulario para crear o actualizar pensiones */}
        <section style={styles.container}>
          <form style={styles.form}>
            <input
              type="text"
              placeholder="Nombre de la Pensión"
              value={nombre || ''}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
            />
            <button onClick={saveOrUpdatePension} style={styles.button}>
              {editId ? 'Actualizar Pensión' : 'Crear Pensión'}
            </button>
          </form>
        </section>

        {/* Tabla de pensiones */}
        <section style={styles.tableSection}>
          <h2 style={styles.title}>Listado de Pensiones</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre de la Pensión</th>
                <th style={styles.th}>Editar</th>
                <th style={styles.th}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {pensiones.map((pensionItem) => (
                <tr key={pensionItem.id}>
                  <td style={styles.td}>{pensionItem.nombrePension}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleEdit(pensionItem)}
                      style={styles.editButton}
                    >
                      Editar
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => deletePension(pensionItem.id)}
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#F5F5F0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    borderBottom: "2px solid #ddd",
  },
  logo: {
    fontSize: "2.5em",
    fontWeight: "bold",
    color: "#003500",
  },
  contactButton: {
    backgroundColor: "#003500",
    color: "#FFFFFF",
    padding: "10px 20px",
    border: "none",
    borderRadius: "25px",
    fontSize: "1em",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
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


export default Pension;
