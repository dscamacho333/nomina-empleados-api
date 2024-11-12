import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Dependencias from "./components/Dependencias";
import ARL from "./components/ARL";
import Cargos from "./components/Cargos";
import EPS from "./components/EPS";
import Pension from "./components/Pension";
import Login from "./components/Login";
import Empleado from "./components/Empleado";
import Novedad from "./components/Novedad";
import Incapacidad from "./components/Incapacidad";
import Vacaciones from "./components/Vacaciones";
import Dashboard from "./components/Dashboard";
import Dashboard2 from "./components/Dashboard2";
import Dashboard3 from "./components/Dashboard3";
import Register from "./components/Register";
import AssignRole from "./components/AssignRole";

// Importar componentes de los reportes
import ReporteNomina from "./components/ReporteNomina";
import ReporteIndividual from "./components/ReporteIndividual";
import ReporteSaludPension from "./components/ReporteSalud";
import ReporteNovedad from "./components/ReporteNovedad";
import FormularioReportes from "./components/FormularioReportes";
import FormularioReportes3 from "./components/FormularioReportes3";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <main>
        <Routes>
          {/* Redirigir a Home tras autenticación */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />

          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/asignar-rol"
            element={
              isAuthenticated ? (
                <AssignRole />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Rutas para la Gestión protegidas */}
          <Route
            path="/dependencias"
            element={
              isAuthenticated ? (
                <Dependencias />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/arl"
            element={
              isAuthenticated ? <ARL /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/cargos"
            element={
              isAuthenticated ? <Cargos /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/eps"
            element={
              isAuthenticated ? <EPS /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/pension"
            element={
              isAuthenticated ? <Pension /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/empleado"
            element={
              isAuthenticated ? <Empleado /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/novedad"
            element={
              isAuthenticated ? <Novedad /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/incapacidad"
            element={
              isAuthenticated ? (
                <Incapacidad />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/vacaciones"
            element={
              isAuthenticated ? (
                <Vacaciones />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Rutas para los reportes protegidas */}
          <Route
            path="/reporteNomina"
            element={
              isAuthenticated ? (
                <ReporteNomina />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/reporteIndividual"
            element={
              isAuthenticated ? (
                <ReporteIndividual />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/reporteSaludPension"
            element={
              isAuthenticated ? (
                <ReporteSaludPension />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/reporteNovedad"
            element={
              isAuthenticated ? (
                <ReporteNovedad />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Nuevas rutas para Dashboard2, Dashboard3 y Formularios de reportes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/dashboard2"
            element={
              isAuthenticated ? (
                <Dashboard2 />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/dashboard3"
            element={
              isAuthenticated ? (
                <Dashboard3 />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/formularioReportes"
            element={
              isAuthenticated ? (
                <FormularioReportes />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/formularioReportes3"
            element={
              isAuthenticated ? (
                <FormularioReportes3 />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Ruta para redirigir todas las rutas no definidas a Home si está autenticado o a login */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
