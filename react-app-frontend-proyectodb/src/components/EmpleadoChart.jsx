import axios from "axios";

export const getEmpleadosPorDependencia = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/consultas/v1/empleados-por-dependencia"
  );
  return response.data;
};

export const getEmpleadosPorCargo = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/consultas/v1/empleados-por-cargo"
  );
  return response.data;
};

export const getEmpleadosPorEPS = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/consultas/v1/empleados-por-eps"
  );
  return response.data;
};

export const getEmpleadosPorPension = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/consultas/v1/empleados-por-pension"
  );
  return response.data;
};

export const getEmpleadosPorEPSyDependencia = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/consultas/v1/empleados-por-eps-dependencia"
  );
  return response.data;
};

export const getEmpleadosPorPensionYDependencia = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/consultas/v1/empleados-por-pension-dependencia"
  );
  return response.data;
};
