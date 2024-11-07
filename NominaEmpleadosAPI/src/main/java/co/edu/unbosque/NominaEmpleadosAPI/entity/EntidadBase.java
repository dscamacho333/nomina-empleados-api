package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class EntidadBase {

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;



}
