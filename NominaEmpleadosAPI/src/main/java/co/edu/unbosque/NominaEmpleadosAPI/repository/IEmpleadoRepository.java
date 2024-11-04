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

    @Query("SELECT e FROM Empleado e " +
            "JOIN e.cargo c " +
            "JOIN e.pension p " +
            "ORDER BY p.nombrePension ASC, c.nombreCargo ASC, " +
            "CASE WHEN :ordenNombre = 'asc' THEN e.primerNombre END ASC, " +
            "CASE WHEN :ordenNombre = 'desc' THEN e.primerNombre END DESC")
    List<Empleado> listarPorCargoEpsPension(@Param("ordenNombre") String ordenNombre);

}

