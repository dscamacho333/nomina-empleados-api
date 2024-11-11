import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/consultas/v1";
const getToken = () => localStorage.getItem("jwtToken"); // Obtiene el token almacenado en localStorage

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getEmpleadosPorDependencia = async () => {
  try {
    const response = await axiosInstance.get("/empleados-por-dependencia");
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados por dependencia:", error);
    throw error;
  }
};

export const getEmpleadosPorCargo = async () => {
  try {
    const response = await axiosInstance.get("/empleados-por-cargo");
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados por cargo:", error);
    throw error;
  }
};

export const getEmpleadosPorEPS = async () => {
  try {
    const response = await axiosInstance.get("/empleados-por-eps");
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados por EPS:", error);
    throw error;
  }
};

export const getEmpleadosPorPension = async () => {
  try {
    const response = await axiosInstance.get("/empleados-por-pension");
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados por pensión:", error);
    throw error;
  }
};

export const getEmpleadosPorEPSyDependencia = async () => {
  try {
    const response = await axiosInstance.get("/empleados-por-eps-dependencia");
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados por EPS y dependencia:", error);
    throw error;
  }
};

export const getEmpleadosPorPensionYDependencia = async () => {
  try {
    const response = await axiosInstance.get("/empleados-por-pension-dependencia");
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados por pensión y dependencia:", error);
    throw error;
  }
};
