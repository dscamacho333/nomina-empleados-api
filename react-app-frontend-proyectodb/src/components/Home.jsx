import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar"; // Importa el componente NavBar

function Home() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const styles = {
    uploadSection: {
      marginTop: "20px",
      textAlign: "center",
    },
    inputFile: {
      display: "block",
      margin: "10px auto",
      padding: "10px",
      fontSize: "1em",
    },
    uploadButton: {
      backgroundColor: "#5cb85c",
      color: "#FFFFFF",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor seleccione un archivo para cargar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8080/api/nomina-empleados/v1/cargar-excel",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setUploadStatus("Archivo cargado con éxito.");
      } else {
        setUploadStatus("Error al cargar el archivo. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setUploadStatus("Error de conexión al cargar el archivo.");
    }
  };

  return (
    <>
      <NavBar /> {/* Usa el componente NavBar */}

      <div style={{ marginTop: "100px", padding: "20px", textAlign: "center" }}>
        <h2>Gestión de Nómina - UroCol</h2>
        <p>
          Sistema de gestión de nómina para la empresa UruCol-242. La base de
          datos permite almacenar y organizar la información de empleados, sus
          cargos, dependencias y afiliaciones a EPS, ARL, y pensiones. Facilita
          el registro de novedades como incapacidades y vacaciones, asegurando
          una administración eficiente, segura y centralizada de la información
          de los trabajadores.
        </p>

        <div style={styles.uploadSection}>
          <h3>Cargar archivo Excel - DB Empleados</h3>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            style={styles.inputFile}
          />
          <button onClick={handleUpload} style={styles.uploadButton}>
            Subir archivo
          </button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      </div>
    </>
  );
}

export default Home;
