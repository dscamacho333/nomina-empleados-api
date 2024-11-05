package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.Novedad;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface INovedadRepository extends CrudRepository<Novedad, Integer> {

    @Query("SELECT e.primerNombre, e.primerApellido, n.numeroDias, " +
            "v.fechaInicio AS fechaInicioVacaciones, v.fechaTerminacion AS fechaTerminacionVacaciones, " +
            "i.fechaInicio AS fechaInicioIncapacidad, i.fechaTerminacion AS fechaTerminacionIncapacidad " +
            "FROM Empleado e " +
            "JOIN Novedad n ON e.id = n.empleado.id " +
            "LEFT JOIN Vacaciones v ON n.id = v.novedad.id " +
            "LEFT JOIN Incapacidad i ON n.id = i.novedad.id " +
            "WHERE (v.fechaInicio BETWEEN :fechaInicio AND :fechaFin " +
            "OR i.fechaInicio BETWEEN :fechaInicio AND :fechaFin)")
    List<Object[]> findNovedadesPorFechas(
            @Param("fechaInicio") Date fechaInicio,
            @Param("fechaFin") Date fechaFin);

    @Query("SELECT e.primerNombre, e.primerApellido, c.nombreCargo, d.nombreDependencia, " +
            "SUM(i.numeroDias) as totalIncapacidades, MIN(i.fechaInicio) as fechaIncapacidadInicio, MAX(i.fechaTerminacion) as fechaIncapacidadFin, " +
            "SUM(n.numeroDias) as diasTrabajados, " +
            "MIN(v.fechaInicio) as vacacionesInicio, MAX(v.fechaTerminacion) as vacacionesFin, " +
            "SUM(n.bonificacion) as bonificacion, SUM(n.transporte) as transporte, " +
            "(SUM(n.bonificacion) + SUM(n.transporte) + e.sueldo) as salarioTotal " +
            "FROM Novedad n " +
            "JOIN n.empleado e " +
            "JOIN e.dependencia d " +
            "JOIN e.cargo c " +
            "LEFT JOIN n.incapacidades i " +
            "LEFT JOIN n.vacaciones v " +
            "WHERE (i.fechaInicio BETWEEN :fechaInicio AND :fechaFin OR " +
            "v.fechaInicio BETWEEN :fechaInicio AND :fechaFin) " +
            "AND d.nombreDependencia = :dependencia " +
            "AND c.nombreCargo = :cargo " +
            "GROUP BY e.primerNombre, e.primerApellido, c.nombreCargo, d.nombreDependencia, e.sueldo")
    List<Object[]> detalleNovedadesPorRangoFechaCargoDependencia(
            @Param("fechaInicio") Date fechaInicio,
            @Param("fechaFin") Date fechaFin,
            @Param("dependencia") String dependencia,
            @Param("cargo") String cargo
    );
}
