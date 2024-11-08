package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Cargo")
public class Cargo extends EntidadBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cargo")
    private Integer id;
    @Column(name = "nombre_cargo")
    private String nombreCargo;
    @OneToMany(mappedBy = "cargo")
    private List<Empleado> empleados = new ArrayList<>();


}
