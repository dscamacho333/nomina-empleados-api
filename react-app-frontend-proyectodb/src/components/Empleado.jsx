import React, { useState, useEffect } from "react";
import NavBar from './NavBar'; // Importa NavBar

function Empleado() {
  const [empleados, setEmpleados] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [eps, setEps] = useState([]);
  const [arls, setArls] = useState([]);
  const [pensiones, setPensiones] = useState([]);
  const [empleado, setEmpleado] = useState({
    id: "",
    primerApellido: "",
    segundoApellido: "",
    primerNombre: "",
    segundoNombre: "",
    fechaIngreso: "",
    dependenciaDTO: "",
    cargoDTO: "",
    epsDTO: "",
    arlDTO: "",
    pensionDTO: "",
    sueldo: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmpleados();
    fetchDependencias();
    fetchCargos();
    fetchEps();
    fetchArls();
    fetchPensiones();
  }, []);

  const getToken = () => localStorage.getItem("jwtToken");

  const fetchEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/empleado/v1/listar", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Error al obtener empleados");
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDependencias = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/dependencia/v1/listar", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Error al obtener dependencias");
      const data = await response.json();
      setDependencias(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCargos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/cargo/v1/listar", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Error al obtener cargos");
      const data = await response.json();
      setCargos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchEps = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/eps/v1/listar", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Error al obtener EPS");
      const data = await response.json();
      setEps(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchArls = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/arl/v1/listar", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Error al obtener ARL");
      const data = await response.json();
      setArls(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchPensiones = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pension/v1/listar", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Error al obtener pensiones");
      const data = await response.json();
      setPensiones(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveOrUpdateEmpleado = async (e) => {
    e.preventDefault();

    const empleadoData = {
      ...empleado,
      dependenciaDTO: { id: empleado.dependenciaDTO },
      cargoDTO: { id: empleado.cargoDTO },
      epsDTO: { id: empleado.epsDTO },
      arlDTO: { id: empleado.arlDTO },
      pensionDTO: { id: empleado.pensionDTO },
    };

    const url = editId
      ? `http://localhost:8080/api/empleado/v1/actualizar/${editId}`
      : "http://localhost:8080/api/empleado/v1/crear";
    const method = editId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(empleadoData),
      });
      if (!response.ok) throw new Error("Error al guardar o actualizar empleado");
      fetchEmpleados();
      setEmpleado({
        id: "",
        primerApellido: "",
        segundoApellido: "",
        primerNombre: "",
        segundoNombre: "",
        fechaIngreso: "",
        dependenciaDTO: "",
        cargoDTO: "",
        epsDTO: "",
        arlDTO: "",
        pensionDTO: "",
        sueldo: "",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteEmpleado = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/empleado/v1/eliminar/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchEmpleados();
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  };

  const handleEdit = (empleado) => {
    setEmpleado(empleado);
    setEditId(empleado.id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado({ ...empleado, [name]: value });
  };


  return (
    <>
      <NavBar /> {/* Usa el componente NavBar */}

      <main style={styles.mainContent}>
        <section style={styles.hero}>
          <div style={styles.heroText}>
            <h2>GESTIÓN DE EMPLEADOS</h2>
          </div>
        </section>

        <section style={styles.container}>
          <form onSubmit={saveOrUpdateEmpleado} style={styles.form}>
            <input
              type="text"
              name="id"
              placeholder="ID del Empleado"
              value={empleado.id || ""}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="primerNombre"
              placeholder="Primer Nombre"
              value={empleado.primerNombre || ""}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="segundoNombre"
              placeholder="Segundo Nombre"
              value={empleado.segundoNombre || ""}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="primerApellido"
              placeholder="Primer Apellido"
              value={empleado.primerApellido || ""}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="text"
              name="segundoApellido"
              placeholder="Segundo Apellido"
              value={empleado.segundoApellido || ""}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="date"
              name="fechaIngreso"
              placeholder="Fecha de Ingreso"
              value={empleado.fechaIngreso || ""}
              onChange={handleChange}
              style={styles.input}
            />
            <select
              name="dependenciaDTO"
              value={empleado.dependenciaDTO || ""}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Seleccionar Dependencia</option>
              {dependencias.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombreDependencia}
                </option>
              ))}
            </select>
            <select
              name="cargoDTO"
              value={empleado.cargoDTO || ""}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Seleccionar Cargo</option>
              {cargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nombreCargo}
                </option>
              ))}
            </select>
            <select
              name="epsDTO"
              value={empleado.epsDTO || ""}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Seleccionar EPS</option>
              {eps.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombreEPS}
                </option>
              ))}
            </select>
            <select
              name="arlDTO"
              value={empleado.arlDTO || ""}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Seleccionar ARL</option>
              {arls.map((arl) => (
                <option key={arl.id} value={arl.id}>
                  {arl.nombreARL}
                </option>
              ))}
            </select>
            <select
              name="pensionDTO"
              value={empleado.pensionDTO || ""}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Seleccionar Pensión</option>
              {pensiones.map((pension) => (
                <option key={pension.id} value={pension.id}>
                  {pension.nombrePension}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="sueldo"
              placeholder="Sueldo"
              value={empleado.sueldo || ""}
              onChange={handleChange}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              {editId ? "Actualizar Empleado" : "Crear Empleado"}
            </button>
          </form>
        </section>

        <section style={styles.tableSection}>
          <h2 style={styles.title}>Listado de Empleados</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Primer Nombre</th>
                <th style={styles.th}>Segundo Nombre</th>
                <th style={styles.th}>Primer Apellido</th>
                <th style={styles.th}>Segundo Apellido</th>
                <th style={styles.th}>Fecha Ingreso</th>
                <th style={styles.th}>Dependencia</th>
                <th style={styles.th}>Cargo</th>
                <th style={styles.th}>EPS</th>
                <th style={styles.th}>ARL</th>
                <th style={styles.th}>Pensión</th>
                <th style={styles.th}>Sueldo</th>
                <th style={styles.th}>Editar</th>
                <th style={styles.th}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <tr key={emp.id}>
                  <td style={styles.td}>{emp.id}</td>
                  <td style={styles.td}>{emp.primerNombre}</td>
                  <td style={styles.td}>{emp.segundoNombre}</td>
                  <td style={styles.td}>{emp.primerApellido}</td>
                  <td style={styles.td}>{emp.segundoApellido}</td>
                  <td style={styles.td}>{emp.fechaIngreso}</td>
                  <td style={styles.td}>
                    {emp.dependenciaDTO?.nombreDependencia}
                  </td>
                  <td style={styles.td}>{emp.cargoDTO?.nombreCargo}</td>
                  <td style={styles.td}>{emp.epsDTO?.nombreEPS}</td>
                  <td style={styles.td}>{emp.arlDTO?.nombreARL}</td>
                  <td style={styles.td}>{emp.pensionDTO?.nombrePension}</td>
                  <td style={styles.td}>{emp.sueldo}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleEdit(emp)}
                      style={styles.editButton}
                    >
                      Editar
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => deleteEmpleado(emp.id)}
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
    alignItems: "flex-start",
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
    gap: "15px",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#5cb85c",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  tableSection: {
    width: "100%",
    maxWidth: "100%", // Asegura el ancho completo de la pantalla
    marginTop: "40px",
    paddingLeft: "20px", // Añade un pequeño margen desde el borde izquierdo
    paddingRight: "20px",
  },
  title: {
    fontSize: "1.5em",
    marginBottom: "20px",
    textAlign: "left",
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
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  editButton: {
    backgroundColor: "#1E90FF",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Empleado;
