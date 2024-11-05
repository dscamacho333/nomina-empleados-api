package co.edu.unbosque.NominaEmpleadosAPI.entity;


import co.edu.unbosque.NominaEmpleadosAPI.entity.enums.RolEnum;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Integer id;

    @Column(name = "role_name")
    @Enumerated(EnumType.STRING)
    private RolEnum rolEnum;

    @OneToMany(mappedBy = "rol", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<PermisoRol> permisos = new HashSet<>();


}
