import React from "react";
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
import Login from "./components/Login"; // Importamos la página de login
import Empleado from "./components/Empleado";
import Novedad from "./components/Novedad"; // Importamos la página de Novedad
import Incapacidad from "./components/Incapacidad"; // Importamos la página de Incapacidad
import Vacaciones from "./components/Vacaciones"; // Importamos la página de Vacaciones
import { Dashboard } from "./components/Dashboard";
import { Dashboard2 } from "./components/Dashboard2";
import { Dashboard3 } from "./components/Dashboard3";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<Home />} />
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<Login />} />
          {/* Ruta para los componentes individuales */}
          <Route path="/dependencias" element={<Dependencias />} />
          <Route path="/arl" element={<ARL />} />
          <Route path="/cargos" element={<Cargos />} />
          <Route path="/eps" element={<EPS />} />
          <Route path="/pension" element={<Pension />} />
          <Route path="/empleado" element={<Empleado />} />
          <Route path="/novedad" element={<Novedad />} />{" "}
          {/* Nueva ruta para Novedad */}
          <Route path="/incapacidad" element={<Incapacidad />} />{" "}
          {/* Nueva ruta para Incapacidad */}
          <Route path="/vacaciones" element={<Vacaciones />} />{" "}
          {/* Nueva ruta para Vacaciones */}
          <Route path="/reporte1" element={<Dashboard />} />
          <Route path="/reporte2" element={<Dashboard2 />} />
          <Route path="/reporte3" element={<Dashboard3 />} />
          {/* Redireccionar cualquier ruta desconocida a la página principal */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
