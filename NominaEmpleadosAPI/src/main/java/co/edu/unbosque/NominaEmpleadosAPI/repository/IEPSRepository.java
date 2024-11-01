package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.EPS;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEPSRepository extends CrudRepository<EPS,Integer> {
}
