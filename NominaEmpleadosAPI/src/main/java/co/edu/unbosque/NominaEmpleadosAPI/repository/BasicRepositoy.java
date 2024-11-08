package co.edu.unbosque.NominaEmpleadosAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface BasicRepositoy <T, ID extends Serializable> extends JpaRepository<T, ID> {

    @Query("SELECT e FROM #{#entityName} e WHERE e.isDeleted = false")
    List<T> findAllNonDeleted();


}
