package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.Vacaciones;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVacacionesRepository extends CrudRepository<Vacaciones, Integer> {
}
