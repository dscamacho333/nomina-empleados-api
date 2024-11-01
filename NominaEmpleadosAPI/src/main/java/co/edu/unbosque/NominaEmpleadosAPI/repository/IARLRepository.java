package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.ARL;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Pension;
import org.springframework.data.repository.CrudRepository;

public interface IARLRepository extends CrudRepository<ARL,Integer> {
}
