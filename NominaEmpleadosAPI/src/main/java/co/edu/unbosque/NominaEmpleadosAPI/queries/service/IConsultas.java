package co.edu.unbosque.NominaEmpleadosAPI.queries.service;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina1;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina2;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteCargoSaludPension;

public interface IConsultas {

    ReporteNomina1 listarEmpleadosOrdenados(String criterioOrden);
    ReporteNomina2 listarEmpleadosPorCargoYDependencia(String ordenNombre);
    ReporteCargoSaludPension listarEmpleadosPensionCargoNombre (String ordenNombre);

}
