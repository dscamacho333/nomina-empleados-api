package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.Pension;
import org.springframework.data.repository.CrudRepository;

public interface IPensionRepository extends CrudRepository<Pension,Integer> {
}
