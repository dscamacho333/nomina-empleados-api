package co.edu.unbosque.NominaEmpleadosAPI.queries.service;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina1;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina2;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.ReporteNovedadDTO;

import java.util.Date;
import java.util.List;

public interface IConsultas {

    ReporteNomina1 listarEmpleadosOrdenados(String criterioOrden);
    ReporteNomina2 listarEmpleadosPorCargoYDependencia(String ordenNombre);




    List<ReporteNovedadDTO> obtenerNovedadesPorFechas(Date fechaInicio, Date fechaFin);
}
