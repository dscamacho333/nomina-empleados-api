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
    List<Object[]> findNovedadesEntreFechas(
            @Param("fechaInicio") Date fechaInicio,
            @Param("fechaFin") Date fechaFin);
}
