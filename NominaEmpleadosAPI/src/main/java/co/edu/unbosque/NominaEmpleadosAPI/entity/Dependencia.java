package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "Dependencia")
public class Dependencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dependencia")
    private Integer id;
    @Column(name = "nombre_dependencia")
    private String nombreDependencia;
    @OneToMany(mappedBy = "dependencia")
    private List<Empleado> empleados = new ArrayList<>();


}
