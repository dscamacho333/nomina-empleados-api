package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.Empleado;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IEmpleadoRepository extends JpaRepository<Empleado, Integer> {

    @Query("SELECT e FROM Empleado e JOIN e.dependencia d " +
            "ORDER BY CASE WHEN :criterioOrden = 'primerNombre' THEN e.primerNombre " +
            "WHEN :criterioOrden = 'dependencia' THEN d.nombreDependencia END")
    List<Empleado> ordenarPor(@Param("criterioOrden") String criterioOrden);

    @Query("SELECT e FROM Empleado e " +
            "JOIN e.cargo c " +
            "JOIN e.dependencia d " +
            "ORDER BY d.nombreDependencia ASC, c.nombreCargo ASC, " +
            "CASE WHEN :ordenNombre = 'asc' THEN e.primerNombre END ASC, " +
            "CASE WHEN :ordenNombre = 'desc' THEN e.primerNombre END DESC")
    List<Empleado> listarPorCargoYDependencia(@Param("ordenNombre") String ordenNombre);

    @Query("SELECT e.cargo.nombreCargo AS cargo, e.dependencia.nombreDependencia AS dependencia, COUNT(e) AS cantidad " +
            "FROM Empleado e " +
            "GROUP BY e.cargo.nombreCargo, e.dependencia.nombreDependencia " +
            "ORDER BY e.dependencia.nombreDependencia ASC, e.cargo.nombreCargo ASC")
    List<Object[]> contarEmpleadosPorCargoYDependencia();

    @Query("SELECT e.dependencia.nombreDependencia AS dependencia, COUNT(e) AS cantidad " +
            "FROM Empleado e " +
            "GROUP BY e.dependencia.nombreDependencia " +
            "ORDER BY e.dependencia.nombreDependencia ASC")
    List<Object[]> contarEmpleadosPorDependencia();

    @Query("SELECT e.cargo.nombreCargo AS cargo, COUNT(e) AS cantidad " +
            "FROM Empleado e " +
            "GROUP BY e.cargo.nombreCargo " +
            "ORDER BY e.cargo.nombreCargo ASC")
    List<Object[]> contarEmpleadosPorCargo();


    @Query("SELECT e FROM Empleado e " +
            "JOIN e.cargo c " +
            "JOIN e.pension p " +
            "ORDER BY p.nombrePension ASC, c.nombreCargo ASC, " +
            "CASE WHEN :ordenNombre = 'asc' THEN e.primerNombre END ASC, " +
            "CASE WHEN :ordenNombre = 'desc' THEN e.primerNombre END DESC")
    List<Empleado> listarPorCargoEpsPension(@Param("ordenNombre") String ordenNombre);

    @Query("SELECT e.primerNombre, e.primerApellido, e.sueldo, c.nombreCargo, d.nombreDependencia, eps.nombreEPS, p.nombrePension, " +
            "n.numeroDias, n.bonificacion, n.transporte, " +
            "v.fechaInicio as vacacionesInicio, v.fechaTerminacion as vacacionesFin, " +
            "i.fechaInicio as incapacidadInicio, i.fechaTerminacion as incapacidadFin " +
            "FROM Empleado e " +
            "JOIN e.cargo c " +
            "JOIN e.dependencia d " +
            "JOIN e.eps eps " +
            "JOIN e.pension p " +
            "LEFT JOIN Novedad n ON n.empleado.id = e.id " +
            "LEFT JOIN Vacaciones v ON v.novedad.id = n.id " +
            "LEFT JOIN Incapacidad i ON i.novedad.id = n.id " +
            "WHERE e.id = :idEmpleado")
   List<Object[]> obtenerInformacionIndividual(@Param("idEmpleado") Integer idEmpleado);

    @Query("SELECT e.eps.nombreEPS AS eps, COUNT(e) AS cantidad " +
            "FROM Empleado e " +
            "GROUP BY e.eps.nombreEPS " +
            "ORDER BY e.eps.nombreEPS ASC")
    List<Object[]> contarEmpleadosPorEPS();

    @Query("SELECT e.pension.nombrePension AS pension, COUNT(e) AS cantidad " +
            "FROM Empleado e " +
            "GROUP BY e.pension.nombrePension " +
            "ORDER BY e.pension.nombrePension ASC")
    List<Object[]> contarEmpleadosPorPension();

    @Query("SELECT e.eps.nombreEPS AS eps, e.dependencia.nombreDependencia AS dependencia, COUNT(e) AS cantidad " +
            "FROM Empleado e " +
            "GROUP BY e.eps.nombreEPS, e.dependencia.nombreDependencia " +
            "ORDER BY e.dependencia.nombreDependencia ASC, e.eps.nombreEPS ASC")
    List<Object[]> contarEmpleadosPorEPSyDependencia();

    @Query("SELECT e.pension.nombrePension AS pension, e.dependencia.nombreDependencia AS dependencia, COUNT(e) AS cantidad " +
            "FROM Empleado e " +
            "GROUP BY e.pension.nombrePension, e.dependencia.nombreDependencia " +
            "ORDER BY e.dependencia.nombreDependencia ASC, e.pension.nombrePension ASC")
    List<Object[]> contarEmpleadosPorPensionYDependencia();





}

