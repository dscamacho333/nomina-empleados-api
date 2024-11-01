package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.Incapacidad;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IIncapacidadRepository extends CrudRepository<Incapacidad, Integer> {
}
