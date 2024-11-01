package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.ARL;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Pension;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IARLRepository extends CrudRepository<ARL,Integer> {
}
