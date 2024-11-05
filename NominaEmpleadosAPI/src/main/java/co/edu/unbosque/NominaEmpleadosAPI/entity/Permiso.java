package co.edu.unbosque.NominaEmpleadosAPI.entity;


import co.edu.unbosque.NominaEmpleadosAPI.entity.enums.PermisoEnum;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Permiso")
public class Permiso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permiso")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "nombre_permiso")
    private PermisoEnum permisoEnum;


}
